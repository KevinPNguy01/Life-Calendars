import { onRequest } from "firebase-functions/https";
import { db } from "./firebase";
import { getDoc, doc, setDoc, writeBatch, DocumentSnapshot, collection, getDocs } from "firebase/firestore";
import axios from "axios";
import { StravaActivity } from "./types/strava_types";
import { error } from "firebase-functions/logger";

const clientId = process.env.STRAVA_CLIENT_ID;
const clientSecret = process.env.STRAVA_CLIENT_SECRET;

export const getStravaActivities = onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    if (req.method === "OPTIONS") {
        res.set("Access-Control-Allow-Methods", "GET");
        res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.set("Access-Control-Max-Age", "3600");
        res.status(204).send("");
        return;
    }

    if (req.method !== "GET") {
        res.status(405).send({ error: "Method Not Allowed" });
        return;
    }

    const accessToken = await getAccessToken();
    await cacheActivities(await fetchActivities(accessToken));
    const data = await retrieveCachedActivities();
    res.status(200).send(data);
});

async function getAccessToken() {
    const authDoc = doc(db, "stravaUserAuth", "KNKevin");
    const docRef = await getDoc(authDoc);
    if (!docRef.exists()) {
        throw error("Document not found");
    }

    let {accessToken, refreshToken, expiresAt} = docRef.data() as {accessToken: string, refreshToken: string, expiresAt: number};
    const currentTime = Math.floor(Date.now() / 1000);

    if (currentTime > expiresAt) {
        const response = await axios.post('https://www.strava.com/oauth/token', {
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        });
        accessToken = response.data.access_token;
        refreshToken = response.data.refresh_token;
        expiresAt = response.data.expires_at;
        setDoc(authDoc, {accessToken, refreshToken, expiresAt})
    }

    return accessToken;
}

async function fetchActivities(accessToken: string) {
    const activities: StravaActivity[] = [];
    let page = 1;
    const perPage = 100; // Max allowed by Strava API

    let lastActivity: DocumentSnapshot;
    while (page <= 1 || !lastActivity!.exists()) {
        const response = await axios.get<StravaActivity[]>(`${"https://www.strava.com/api/v3"}/athlete/activities`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                page,
                per_page: perPage,
            },
        });

        if (response.data.length === 0) break;

        activities.push(...response.data);
        page += 1;

        lastActivity = await getDoc(doc(db, "stravaActivities", `${activities[activities.length-1].upload_id}`));
    }

    return activities;
}

async function cacheActivities(activities: StravaActivity[]) {
    for (let i = 0; i < activities.length; i += 500) {
        const batchDb = writeBatch(db);
        for (let j = 0; j < 500 && i + j < activities.length; ++ j) {
            const activity = activities[i + j];
            const docRef = doc(db, "stravaActivities", `${activity.upload_id}`);
            batchDb.set(docRef, activity);
        }
        await batchDb.commit();
    }
}

async function retrieveCachedActivities() {
    const activityDocs = await getDocs(collection(db, "stravaActivities"));
    const activities: StravaActivity[] = [];
    activityDocs.forEach(doc => activities.push(doc.data() as StravaActivity));
    return activities;
}
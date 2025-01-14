import axios from "axios";
import { onRequest } from "firebase-functions/https";
import { error } from "firebase-functions/logger";
import { doc, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { AuthResponse, StravaActivity } from "./types/strava_types";

const clientId = process.env.VITE_STRAVA_CLIENT_ID;
const clientSecret = process.env.VITE_STRAVA_CLIENT_SECRET;

export const getStravaActivities = onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    if (req.method === "OPTIONS") {
        res.set("Access-Control-Allow-Methods", "POST");
        res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.set("Access-Control-Max-Age", "3600");
        res.status(204).send("");
        return;
    }

    if (req.method !== "POST") {
        res.status(405).send({ error: "Method Not Allowed" });
        return;
    }

    const {athlete_id} = req.body;
    if (!athlete_id) {
        res.status(400).send({message: "Missing 'athlete_id' parameter."});
        return;
    }

    const accessToken = await getAccessToken(athlete_id);
    await cacheActivities(athlete_id, await fetchActivities(athlete_id, accessToken));
    const data = await getStravaCalendar(athlete_id, );
    res.status(200).send(data);
});

export const getStravaAccessToken = onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    if (req.method === "OPTIONS") {
        res.set("Access-Control-Allow-Methods", "POST");
        res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.set("Access-Control-Max-Age", "3600");
        res.status(204).send("");
        return;
    }

    if (req.method !== "POST") {
        res.status(405).send({ error: "Method Not Allowed" });
        return;
    }

    const {code} = req.body;
    if (!code) {
        res.status(400).send({message: "Missing 'code' parameter."});
        return;
    }

    const response = await fetch('https://www.strava.com/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            code: code,
            grant_type: 'authorization_code',
        }),
    });

    if (response.ok) {
        const data = await response.json() as AuthResponse;
        const userDocRef = doc(db, "stravaUsers", `${data.athlete.id}`);
        await setDoc(userDocRef, {
            accessToken: data.access_token,
            expiresAt: data.expires_at,
            refreshToken: data.refresh_token
        }, {merge: true});

        res.status(200).send({athlete_id: data.athlete.id});
    } else {
        res.status(500).send({message: 'Failed to exchange code for token', clientId: clientId});
    }
});

async function getAccessToken(athleteId: string) {
    const userDocRef = doc(db, "stravaUsers", athleteId);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
        throw error("Document not found");
    }
    let {accessToken, refreshToken, expiresAt} = userDoc.data() as {accessToken: string, refreshToken: string, expiresAt: number};

    // Refresh access token if it is expired
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
        setDoc(userDocRef, {accessToken, refreshToken, expiresAt}, {merge: true})
    }

    return accessToken;
}

/**
 * Fetch activities until the oldest fetched is already in the database.
 * @param accessToken The token uses to authenticate to Strava.
 * @returns A list Strava activities.
 */
async function fetchActivities(athleteId: string, accessToken: string) {
    const activities: StravaActivity[] = [];
    let page = 1;
    const perPage = 100; // Max allowed by Strava API

    const docRef = doc(db, "stravaUsers", athleteId);
    const userDoc = await getDoc(docRef);
    const calendarData = (userDoc.data()?.calendar || {}) as Record<string, {start_date: Date, distance: number}>;

    // Fetch just the first page or until the oldest activity is found in the database.
    while (true) {
        const response = await axios.get<StravaActivity[]>("https://www.strava.com/api/v3/athlete/activities", {
            headers: {Authorization: `Bearer ${accessToken}`,},
            params: {page, per_page: perPage,},
        });
        const data = response.data;
        if (data.length === 0) break;                           // Break if no activities were retrieved.
        if (`${response.data[0].id}` in calendarData) break;    // Break if the most recent activity is already in the database.
        activities.push(...response.data.filter(activity => activity.type === "Run"));
        if (`${data[data.length-1].id}` in calendarData) break; // Break if the last activity is already in the database.
        page += 1;
    }

    return activities;
}

async function cacheActivities(athleteId: string, activities: StravaActivity[]) {
    const docRef = doc(db, "stravaUsers", athleteId);
    const userDoc = await getDoc(docRef);
    const calendarData = (userDoc.data()?.calendar || {}) as Record<string, {start_date: Date, distance: number}>;

    for (const activity of activities) {
        calendarData[`${activity.id}`] = {
            start_date: new Date(activity.start_date_local),
            distance: activity.distance
        }
    }

    updateDoc(docRef, {calendar: calendarData});
}

async function getStravaCalendar(athleteId: string) {
    const stravaCalendar: Record<string, number> = {};
    const docRef = doc(db, "stravaUsers", athleteId);
    const userDoc = await getDoc(docRef);
    const calendarData = (userDoc.data()?.calendar || {}) as Record<string, {start_date: Timestamp, distance: number}>;
    for (const activity of Object.values(calendarData)) {
        const originalDate = activity.start_date.toDate();

        const year = originalDate.getUTCFullYear();
        const month = originalDate.getUTCMonth();
        const day = originalDate.getUTCDate();

        const time = new Date(Date.UTC(year, month, day)).getTime() / 1000;
        const key = `${time}`;

        if (!(key in stravaCalendar)) {
            stravaCalendar[key] = 0;
        }
        stravaCalendar[key] += activity.distance;
    }
    return stravaCalendar;
}
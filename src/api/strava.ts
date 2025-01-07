import axios from 'axios';
import { StravaActivity } from './types/strava_types';

const clientId = import.meta.env.VITE_STRAVA_CLIENT_ID;
const clientSecret = import.meta.env.VITE_STRAVA_CLIENT_SECRET;
const code = import.meta.env.VITE_STRAVA_ACCESS_CODE;

export const fetchStrava = async (year: number) => {
    if (!localStorage.getItem("stravaAccessToken") || localStorage.getItem("stravaAccessToken") === "undefined") {
        console.log("No access token")
        await exchangeAuthorizationCode(clientId, clientSecret, code).then(({ accessToken, refreshToken, expiresAt}) => {
            localStorage.setItem("stravaAccessToken", accessToken);
            localStorage.setItem("stravaRefreshToken", refreshToken);
            localStorage.setItem("stravaExpiresAt", expiresAt);
        });
    }

    
    let accessToken = localStorage.getItem("stravaAccessToken")!;
    let refreshToken = localStorage.getItem("stravaRefreshToken")!;
    let expiresAt = localStorage.getItem("stravaExpiresAt")!;

    // Refresh access token if needed
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime > parseInt(expiresAt)) {
        console.log("Refreshing token")
        const response = await axios.post('https://www.strava.com/oauth/token', {
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        });
        localStorage.setItem("stravaAccessToken", response.data.access_token);
        localStorage.setItem("stravaRefreshToken", response.data.refresh_token);
        localStorage.setItem("stravaExpiresAt", response.data.expires_at);
    }

    accessToken = localStorage.getItem("stravaAccessToken")!;
    refreshToken = localStorage.getItem("stravaRefreshToken")!;
    expiresAt = localStorage.getItem("stravaExpiresAt")!;

    const data = await fetchStravaActivities(accessToken);
    return data;
}

export function parseStrava(activities: StravaActivity[]) {
    const data: Record<string, number> = {};
    for (const activity of activities) {
        const originalDate = new Date(activity.start_date_local);

        const year = originalDate.getUTCFullYear();
        const month = originalDate.getUTCMonth(); // 0 = January, 1 = February, etc.
        const day = originalDate.getUTCDate();

        const time = new Date(Date.UTC(year, month, day)).getTime() / 1000;

        if (!(time in data)) {
            data[time] = 0;
        }
        data[time] += activity.distance / 1609.34;
    }
    return data;
}

async function fetchStravaActivities(accessToken: string): Promise<StravaActivity[]> {
    const activities: StravaActivity[] = [];
    let page = 1;
    const perPage = 100; // Max allowed by Strava API

    try {
    while (page <= 10) {
        const response = await axios.get<StravaActivity[]>(`${"https://www.strava.com/api/v3"}/athlete/activities`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                page,
                per_page: perPage,
            },
        });

        if (response.data.length === 0) break; // No more activities to fetch

        activities.push(...response.data);
        page += 1; // Fetch the next page
    }

    return activities;
    } catch (error) {
    console.error('Error fetching Strava activities:', error);
    throw error;
    }
}


async function exchangeAuthorizationCode(clientId: string, clientSecret: string, code: string): Promise<{ accessToken: string; refreshToken: string, expiresAt: string}> {
    const url = 'https://www.strava.com/oauth/token';

    try {
        const response = await axios.post(url, {
            client_id: clientId,
            client_secret: clientSecret,
            code,
            grant_type: 'authorization_code',
        });

        return {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            expiresAt: response.data.expires_at
        };
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Error exchanging authorization code:', error.response?.data);
        } else if (error instanceof Error) {
            console.error('Error exchanging authorization code:', error.message);
        } else {
            console.error('Unknown error exchanging authorization code:', error);
        }
        throw error;
    }    
}
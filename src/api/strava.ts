const activitiesUrl = "https://us-central1-my-life-calendars.cloudfunctions.net/getStravaActivities";
const accessTokenUrl = "https://us-central1-my-life-calendars.cloudfunctions.net/getStravaAccessToken";

export const getNewAccessToken = async (code: string) => {
    const response = await fetch(accessTokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({code}),
    });
    const data = await response.json();
    return data;
}

export const fetchStrava = async (athlete_id: string) => {
    const response = await fetch(activitiesUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({athlete_id}),
    });
    const data = await response.json() as Record<string, number>;
    return data;
}

export const parseStrava = (data: Record<string, number>) => {
    for (const [time, distance] of Object.entries(data)) {
        data[time] = distance / 1609.34;
    }
    return data;
}
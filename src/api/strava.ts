import { StravaActivity } from '../../functions/src/types/strava_types';

const apiUrl = "https://getstravaactivities-zxhhhobsqq-uc.a.run.app";

export const fetchStrava = async (year: number) => {
    const response = await fetch(apiUrl, { method: "GET"});
    const data = await response.json() as StravaActivity[];
    console.log(data)
    return data;
}

export function parseStrava(activities: StravaActivity[]) {
    const data: Record<string, number> = {};
    for (const activity of activities) {
        const originalDate = new Date(activity.start_date_local);

        const year = originalDate.getUTCFullYear();
        const month = originalDate.getUTCMonth();
        const day = originalDate.getUTCDate();

        const time = new Date(Date.UTC(year, month, day)).getTime() / 1000;

        if (!(time in data)) {
            data[time] = 0;
        }
        data[time] += activity.distance / 1609.34;
    }
    return data;
}
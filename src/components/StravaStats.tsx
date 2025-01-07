import { useState, useEffect } from "react";
import { fetchLeetcode } from "../api/leetcode";
import { DailyCalendar } from "../features/calendar/DailyCalendar";
import { fetchGithub, parseGithub } from "../api/github";
import { fetchStrava, parseStrava } from "../api/strava";

const colors: [number, string][] = [
    [1, "#CA3E02"],
    [3, "#FC4C02"],
    [5, "#FD7F49"],
    [10, "#FEAA86"]
];

export function StravaStats({year}: {year: number}) {
    const [data, setData] = useState<Record<string, number>>({});
    
    useEffect(() => {(async () => {
        const data = await fetchStrava(year);
        setData(parseStrava(data));
    })()}, []);

    return (
        <div>
            <DailyCalendar year={year} data={data} colors={colors}/>
        </div>
    );
}
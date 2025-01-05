import { useState, useEffect } from "react";
import { fetchLeetcode } from "../api/leetcode";
import { DailyCalendar } from "../features/calendar/DailyCalendar";
import { fetchGithub, parseGithub } from "../api/github";

const colors: [number, string][] = [
    [1, "#0F55BD"],
    [3, "#1D70ED"],
    [5, "#5594F1"],
    [10, "#8EB7F6"]
];

export function GitHubStats({year}: {year: number}) {
    const [data, setData] = useState<Record<string, number>>({});
    
    useEffect(() => {(async () => {
        const data = await fetchGithub(year);
        setData(parseGithub(data.data.viewer));
    })()}, []);

    return (
        <div>
            <DailyCalendar year={year} data={data} colors={colors}/>
        </div>
    );
}
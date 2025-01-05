import { useState, useEffect } from "react";
import { fetchLeetcode } from "../api/leetcode";
import { DailyCalendar } from "../features/calendar/DailyCalendar";
import { fetchGithub, parseGithub } from "../api/github";

export function GitHubStats({year}: {year: number}) {
    const [data, setData] = useState<Record<string, number>>({});
    
    useEffect(() => {(async () => {
        const data = await fetchGithub(year);
        setData(parseGithub(data.data.viewer));
    })()}, []);

    return (
        <div>
            <DailyCalendar year={year} data={data}/>
        </div>
    );
}
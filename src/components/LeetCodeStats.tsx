import { useState, useEffect } from "react";
import { fetchLeetcode } from "../api/leetcode";
import { DailyCalendar } from "../features/calendar/DailyCalendar";

export function LeetCodeStats({year}: {year: number}) {
    const [data, setData] = useState<Record<string, number>>({});
    
    useEffect(() => {(async () => {
        const data = await fetchLeetcode(year);
        setData(data);
    })()}, []);

    return (
        <div>
            <DailyCalendar year={year} data={data}/>
        </div>
    );
}
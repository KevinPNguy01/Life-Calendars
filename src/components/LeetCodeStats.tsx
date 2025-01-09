import { useState, useEffect } from "react";
import { fetchLeetcode } from "../api/leetcode";
import { DailyCalendar } from "../features/calendar/DailyCalendar";

const colors: [number, string][] = [
    [1, "#006620"],
    [3, "#019927"],
    [5, "#24c241"],
    [10, "#7be187"]
];

export function LeetCodeStats({startDate, endDate}: {startDate: Date, endDate: Date}) {
    const [data, setData] = useState<Record<string, number>>({});
    
    useEffect(() => {(async () => {
        const data = {};
        for (let year = startDate.getUTCFullYear(); year <= endDate.getUTCFullYear(); ++ year) {
            Object.assign(data, await fetchLeetcode(year));
        }
        setData(data);
    })()}, []);

    return (
        <div>
            <DailyCalendar startDate={startDate} endDate={endDate} data={data} colors={colors} unit={"submissions"}/>
        </div>
    );
}
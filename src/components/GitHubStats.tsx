import { useState, useEffect } from "react";
import { DailyCalendar } from "../features/calendar/DailyCalendar";
import { fetchGithub, parseGithub } from "../api/github";

const colors: [number, string][] = [
    [1, "#0F55BD"],
    [3, "#1D70ED"],
    [5, "#5594F1"],
    [10, "#8EB7F6"]
];

export function GitHubStats({startDate, endDate}: {startDate: Date, endDate: Date}) {
    const [data, setData] = useState<Record<string, number>>({});
    
    useEffect(() => {(async () => {
        const data = {};
        for (let year = startDate.getUTCFullYear(); year <= endDate.getUTCFullYear(); ++ year) {
            Object.assign(data, parseGithub((await fetchGithub(year)).data.viewer, new Date(Date.UTC(year, 0))));
        }
        setData(data);
    })()}, [startDate, endDate]);

    return (
        <DailyCalendar startDate={startDate} endDate={endDate} data={data} colors={colors} unit={"commits"} showMonths={false}/>
    );
}
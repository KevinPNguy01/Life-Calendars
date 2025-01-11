import { useState, useEffect, useContext } from "react";
import { DailyCalendar } from "../calendar/DailyCalendar";
import { fetchGithub, parseGithub } from "../../api/github";
import { TimeContext } from "../../App";

const colors: [number, string][] = [
    [1, "#0F55BD"],
    [3, "#1D70ED"],
    [5, "#5594F1"],
    [10, "#8EB7F6"]
];

export function GitHubStats() {
    const {timePeriod} = useContext(TimeContext);
    const [data, setData] = useState<Record<string, number>>({});
    
    useEffect(() => {(async () => {
        const data = {};
        const startYear = timePeriod[0].getUTCFullYear();
        const endYear = timePeriod[1].getUTCFullYear();
        for (let year = startYear; year <= endYear; ++year) {
            const userData = await fetchGithub(year);
            const yearStart = new Date(Date.UTC(year));
            const parsedData = parseGithub(userData, yearStart);
            Object.assign(data, parsedData);
        }
        setData(data);
    })()}, [timePeriod]);

    return (
        <DailyCalendar data={data} colors={colors} unit="commits"/>
    );
}
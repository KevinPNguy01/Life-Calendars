import { useState, useEffect, useContext } from "react";
import { fetchLeetcode } from "../../api/leetcode";
import { DailyCalendar } from "../calendar/DailyCalendar";
import { TimeContext } from "../../App";

const colors: [number, string][] = [
    [1, "#006620"],
    [3, "#019927"],
    [5, "#24c241"],
    [10, "#7be187"]
];

export function LeetCodeStats() {
    const {timePeriod} = useContext(TimeContext);
    const [data, setData] = useState<Record<string, number>>({});
    
    useEffect(() => {(async () => {
        const data = {};
        const startYear = timePeriod[0].getUTCFullYear();
        const endYear = timePeriod[1].getUTCFullYear();
        for (let year = startYear; year <= endYear; ++year) {
            const newData = await fetchLeetcode(year);
            Object.assign(data, newData);
        }
        setData(data);
    })()}, [timePeriod]);

    return (
        <DailyCalendar data={data} colors={colors} unit="submissions"/>
    );
}
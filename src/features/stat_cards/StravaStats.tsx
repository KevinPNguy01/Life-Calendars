import { useState, useEffect } from "react";
import { DailyCalendar } from "../calendar/DailyCalendar";
import { fetchStrava, parseStrava } from "../../api/strava";

const colors: [number, string][] = [
    [1, "#CA3E02"],
    [3, "#FC4C02"],
    [5, "#FD7F49"],
    [10, "#FEAA86"]
];

export function StravaStats() {
    const [data, setData] = useState<Record<string, number>>({});
    
    useEffect(() => {(async () => {
        const newData = await fetchStrava();
        const parsedData = parseStrava(newData);
        setData(parsedData);
    })()}, []);

    return (
        <DailyCalendar data={data} colors={colors} unit="miles run"/>
    );
}
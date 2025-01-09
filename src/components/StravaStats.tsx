import { useState, useEffect } from "react";
import { DailyCalendar } from "../features/calendar/DailyCalendar";
import { fetchStrava, parseStrava } from "../api/strava";

const colors: [number, string][] = [
    [1, "#CA3E02"],
    [3, "#FC4C02"],
    [5, "#FD7F49"],
    [10, "#FEAA86"]
];

export function StravaStats({startDate, endDate}: {startDate: Date, endDate: Date}) {
    const [data, setData] = useState<Record<string, number>>({});
    
    useEffect(() => {(async () => {
        const data = await fetchStrava();
        setData(parseStrava(data));
    })()}, []);

    return (
        <div>
            <DailyCalendar startDate={startDate} endDate={endDate} data={data} colors={colors} unit={"miles run"}/>
        </div>
    );
}
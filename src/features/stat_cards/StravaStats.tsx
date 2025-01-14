import { useContext, useEffect, useState } from "react";
import { fetchStrava, getNewAccessToken, parseStrava } from "../../api/strava";
import { UserContext } from "../../contexts/UserContext";
import { DailyCalendar } from "../calendar/DailyCalendar";

const colors: [number, string][] = [
    [1, "#CA3E02"],
    [3, "#FC4C02"],
    [5, "#FD7F49"],
    [10, "#FEAA86"]
];

export function StravaStats() {
    const {stravaId, setStravaId} = useContext(UserContext);
    const [data, setData] = useState<Record<string, number>>({});
    
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        (async () => {
            if (code) {
                const response = await getNewAccessToken(code);
                const athlete_id: number = response.athlete_id;
                if (athlete_id) {
                    setStravaId(`${athlete_id}`);
                }
            }
        })();
    }, [setStravaId]);

    useEffect(() => {
        (async () => {
            const newData = await fetchStrava(stravaId);
            const parsedData = parseStrava(newData);
            setData(parsedData);
        })();
    }, [stravaId]);

    return (
        <DailyCalendar data={data} colors={colors} unit="miles run"/>
    );
}
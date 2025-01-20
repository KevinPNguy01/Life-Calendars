import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        const code = searchParams.get('code');
        (async () => {
            if (code) {
                setSearchParams({}, { replace: true });
                navigate(window.location.pathname, { replace: true });
                
                setStravaId("");
                const response = await getNewAccessToken(code);
                const athlete_id: number = response.athlete_id;
                if (athlete_id) {
                    setStravaId(`${athlete_id}`);
                }
            }
        })();
    }, [navigate, searchParams, setSearchParams, setStravaId]);

    useEffect(() => {(async () => {
        setData({});
        const newData = await fetchStrava(stravaId);
        const parsedData = parseStrava(newData);
        setData(parsedData);
    })();}, [stravaId]);

    return (
        <DailyCalendar data={data} colors={colors} unit="miles run"/>
    );
}
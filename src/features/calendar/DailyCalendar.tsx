import { useEffect, useState } from "react";
import { DailyMonth } from "./DailyMonth";

const graphqlUrl = "https://us-central1-kevins-life-stats.cloudfunctions.net/graphqlProxy";
const endpoint = `https://leetcode.com/graphql`;
const query = `query userProfileCalendar($username: String!, $year: Int) {
  matchedUser(username: $username) {
    userCalendar(year: $year) {
      submissionCalendar
    }
  }
}`;
const variables = `{"username": "nguyk1", "year": 2024}`;

export function DailyCalendar({year}: {year: number}) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [submissions, setSubmissions] = useState<Record<string, number>>({});

    useEffect(() => {(async () => {
        const response = await fetch(graphqlUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                endpoint,
                query,
                variables
            }),
        });
        const json = await response.json();
        const data = JSON.parse(json.data.matchedUser.userCalendar.submissionCalendar);
        setSubmissions(data);
    })()}, []);
    
    return (
        <div className="flex gap-2 w-full h-full justify-center items-center">
            {months.map((month, index) => {
                const start = new Date(Date.UTC(year, index, 1));
                const end = new Date(Date.UTC(year, index + 1, 1));                
                const offSet = start.getUTCDay();
                const numDays = Math.floor((+end - +start) / (1000 * 3600 * 24));
                const numWeeks = Math.ceil((numDays + offSet) / 7);
                return (
                    <div key={month} className="flex flex-col items-center">
                        <DailyMonth start={start} submissions={submissions} offSet={offSet} numDays={numDays} numWeeks={numWeeks}/>
                        {month}
                    </div>
                );
            })}
        </div>
    );
}
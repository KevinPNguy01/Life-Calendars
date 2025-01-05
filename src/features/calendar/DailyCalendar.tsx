import { useEffect, useState } from "react";
import { fetchGithub, parseGithub } from "../../api/github";
import { DailyMonth } from "./DailyMonth";

export function DailyCalendar({year, data}: {year: number, data: Record<string, number>}) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
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
                        <DailyMonth start={start} data={data} offSet={offSet} numDays={numDays} numWeeks={numWeeks}/>
                        {month}
                    </div>
                );
            })}
        </div>
    );
}
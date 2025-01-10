import { useMemo } from "react";
import { DailyMonth } from "./DailyMonth";

function longestStreak(record: Record<string, number>): number {
    // Get the sorted list of dates
    const dates = Object.keys(record)
      .map(date => new Date(parseInt(date) * 1000)) // Convert string to Date object
      .sort((a, b) => a.getTime() - b.getTime()); // Sort dates in ascending order

    if (!dates.length) return 0;
  
    let longest = 0;
    let currentStreak = 1;
  
    // Iterate through the sorted dates and calculate streaks
    for (let i = 1; i < dates.length; i++) {
      const diffInMilliseconds = dates[i].getTime() - dates[i - 1].getTime(); // Difference in milliseconds
      const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24); // Convert milliseconds to days
  
      if (diffInDays === 1) {
        currentStreak++; // Consecutive day, increment streak
      } else {
        longest = Math.max(longest, currentStreak); // Update longest streak
        currentStreak = 1; // Reset streak for new gap
      }
    }
  
    // Return the longest streak after the loop
    return Math.max(longest, currentStreak);
  }  

export function DailyCalendar({startDate, endDate, data, colors, unit, showMonths}: {startDate: Date, endDate: Date, data: Record<string, number>, colors: [number, string][], unit: string, showMonths: boolean}) {
    const months: number[] = [];
    const startYear = startDate.getUTCFullYear();
    for (let i = startDate.getUTCMonth(); Date.UTC(startYear, i) < endDate.getTime(); ++i) {
        months.push(i);
    }
    
    const filteredData = Object.fromEntries(Object.entries(data)
        .filter(([key]) => {
            const keyDate = new Date(parseInt(key) * 1000);
            return keyDate >= startDate && keyDate <= endDate;
        }));

    const streak = useMemo(() => longestStreak(filteredData), [startDate, endDate, data]);
    
    return (
        <div className="bg-secondary p-4 rounded flex flex-col gap-2">
            <div className="flex justify-between items-end">
                <p>
                    <span className="font-bold text-xl">{Math.round(Object.values(filteredData).reduce((sum, value) => sum + value, 0))}</span>
                    <span className="text-neutral-400">{` ${unit}`}</span>
                </p>
                <div className="flex gap-8">
                    <p>
                        <span className="text-neutral-400 text-sm">Total Days Active: </span>
                        <span className="text-neutral-200 font-bold text-sm">{Object.keys(filteredData).length}</span>
                    </p>
                    <p>
                        <span className="text-neutral-400 text-sm">Longest Streak: </span>
                        <span className="text-neutral-200 font-bold text-sm">{streak}</span>
                    </p>
                </div>
            </div>
            <div className="w-fit h-fit flex gap-2 justify-center items-center">
                {months.map((index) => {
                    const start = new Date(Math.max(startDate.getTime(), Date.UTC(startYear, index)));
                    const end = new Date(Math.min(endDate.getTime(), Date.UTC(startYear, index + 1)));                
                    const offSet = start.getUTCDay();
                    const numDays = Math.floor((+end - +start) / (1000 * 3600 * 24));
                    const numWeeks = Math.ceil((numDays + offSet) / 7);
                    return (
                        <div key={index} className="flex flex-col items-center gap-1">
                            <DailyMonth start={start} data={data} offSet={offSet} numDays={numDays} numWeeks={numWeeks} colors={colors} unit={unit}/>
                            {showMonths && start.toLocaleString('default', { timeZone: 'UTC', month: 'short' })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
import { memo, useContext, useMemo } from "react";
import { TimeContext } from "../../contexts/TimeContext";
import { DailyMonth } from "./DailyMonth";

export function DailyCalendar({data, colors, unit}: {data: Record<string, number>, colors: [number, string][], unit: string}) {
    const {timePeriod} = useContext(TimeContext);
    const [startDate, endDate] = timePeriod;

    const filteredData = useMemo(() => Object.fromEntries(
        Object.entries(data).filter(
            ([key]) => {
                const keyDate = new Date(parseInt(key) * 1000);
                return keyDate >= startDate && keyDate < endDate;
            }
        )
    ), [startDate, endDate, data]);

    const streak = useMemo(() => longestStreak(filteredData), [filteredData]);
    
    return (
        <div className="bg-secondary p-4 rounded flex flex-col gap-2 max-w-full">
            <div className="flex justify-between items-start gap-8">
                <p>
                    <span className="font-bold text-xl">{Math.round(Object.values(filteredData).reduce((sum, value) => sum + value, 0))}</span>
                    <span className="text-neutral-400">{` ${unit}`}</span>
                </p>
                <div className="flex gap-8 items-start">
                    <p>
                        <span className="text-center text-neutral-400 text-sm">Total Days Active: </span>
                        <span className="text-neutral-200 font-bold text-sm">{Object.keys(filteredData).length}</span>
                    </p>
                    <p>
                        <span className="text-center text-neutral-400 text-sm">Longest Streak: </span>
                        <span className="text-neutral-200 font-bold text-sm">{streak}</span>
                    </p>
                </div>
            </div>
            <div className="w-fit h-fit flex gap-2 max-w-full overflow-auto">
                <Months startDate={startDate} endDate={endDate} data={data} colors={colors} unit={unit}/>
            </div>
        </div>
    );
}

const Months = memo(function Months({startDate, endDate, data, colors, unit}: {startDate: Date, endDate: Date, data: Record<string, number>, colors: [number, string][], unit: string}) {
    const months: number[] = [];
    const startYear = startDate.getUTCFullYear();
    const startMonth = startDate.getUTCMonth();
    for (let i = startMonth; Date.UTC(startYear, i) < endDate.getTime(); ++i) {
        months.push(i);
    }
    
    return (
        <>
            {months.map((index) => {
                const start = new Date(Math.max(startDate.getTime(), Date.UTC(startYear, index)));
                const end = new Date(Math.min(endDate.getTime(), Date.UTC(startYear, index + 1)));
                return (
                    <div key={index} className="flex flex-col items-center gap-1">
                        <DailyMonth start={start} end={end} data={data} colors={colors} unit={unit}/>
                        {start.toLocaleString('default', { timeZone: 'UTC', month: 'short' })}
                    </div>
                );
            })}
        </>
    )
})

function longestStreak(record: Record<string, number>) {
    const dates = Object.keys(record)
        .map(date => new Date(parseInt(date) * 1000))
        .sort((a, b) => a.getTime() - b.getTime());
    if (!dates.length) return 0;
  
    let longest = 0;
    let currentStreak = 1;
  
    for (let i = 1; i < dates.length; i++) {
        const diffInMilliseconds = dates[i].getTime() - dates[i - 1].getTime();
        const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
    
        if (diffInDays === 1) {
            ++currentStreak;
        } else {
            longest = Math.max(longest, currentStreak);
            currentStreak = 1;
        }
    }
  
    return Math.max(longest, currentStreak);
}  
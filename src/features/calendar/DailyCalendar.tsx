import { DailyMonth } from "./DailyMonth";

export function DailyCalendar({startDate, endDate, data, colors, unit}: {startDate: Date, endDate: Date, data: Record<string, number>, colors: [number, string][], unit: string}) {
    const months: number[] = [];
    const startYear = startDate.getUTCFullYear();
    for (let i = startDate.getUTCMonth(); Date.UTC(startYear, i) < endDate.getTime(); ++i) {
        months.push(i);
    }
    
    return (
        <div className="flex gap-2 w-full h-full justify-center items-center">
            {months.map((index) => {
                const start = new Date(Math.max(startDate.getTime(), Date.UTC(startYear, index)));
                const end = new Date(Math.min(endDate.getTime(), Date.UTC(startYear, index + 1)));                
                const offSet = start.getUTCDay();
                const numDays = Math.floor((+end - +start) / (1000 * 3600 * 24));
                const numWeeks = Math.ceil((numDays + offSet) / 7);
                return (
                    <div key={index} className="flex flex-col items-center">
                        <DailyMonth start={start} data={data} offSet={offSet} numDays={numDays} numWeeks={numWeeks} colors={colors} unit={unit}/>
                        {start.toLocaleString('default', { timeZone: 'UTC', month: 'short' })}
                    </div>
                );
            })}
        </div>
    );
}
import { DailyMonth } from "./DailyMonth";

export function DailyCalendar({year}: {year: number}) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return (
        <div className="flex gap-2 w-full h-full justify-center items-center">
            {months.map((month, index) => {
                const start = new Date(year, index, 1);
                const end = new Date(year, index+1, 1);
                const offSet = start.getDay();
                const numDays = Math.round((+end - +start) / (1000 * 3600 * 24));
                const numWeeks = Math.ceil((numDays + offSet) / 7);
                return (
                    <div key={month} className="flex flex-col items-center">
                        <DailyMonth offSet={offSet} data={Array.from({ length: numDays })} numWeeks={numWeeks}/>
                        {month}
                    </div>
                );
            })}
        </div>
    );
}
import { DailyDay } from "./DailyDay";

export function DailyMonth({start, end, data, colors, unit}: {start: Date, end: Date, data: Record<string, number>, colors: [number, string][], unit: string}) {
	const offSet = start.getUTCDay();
	const numDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
	const numWeeks = Math.ceil((numDays + offSet) / 7);
	
	return (
        <table className="border-separate border-spacing-[0.1875rem]">
			<tbody>
				{Array.from({ length: 7 }).map((_, rowIndex) => (
					<tr key={rowIndex}>
						{Array.from({ length: numWeeks }).map((_, colIndex) => {
							const index = colIndex * 7 + rowIndex;
							const inRange = offSet <= index && index < numDays + offSet;
							const time = Math.floor(start.getTime() / 1000) + (index - offSet) * 24 * 60 * 60;	
							const value = time in data ? Math.round(data[time] * 100) / 100 : 0;
							const color = getColor(value, colors);	
							return <DailyDay key={index} inRange={inRange} time={time} value={value} color={color} unit={unit}/>
						})}
					</tr>
				))}
			</tbody>
        </table>
    );
}

function getColor(value: number, colors: [number, string][]) {
	for (let i = colors.length - 1; i >= 0; --i) 
		if (value >= colors[i][0]) 
			return colors[i][1];
	return "";
}
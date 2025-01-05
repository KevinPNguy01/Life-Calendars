export function DailyMonth({start, data, offSet, numDays, numWeeks}: {start: Date, data: Record<string, number>, offSet: number, numDays: number, numWeeks: number}) {
	return (
        <table className="border-separate border-spacing-[0.1875rem]">
			<tbody>
				{Array.from({ length: 7 }).map((_, rowIndex) => (
					<tr key={rowIndex}>
						{Array.from({ length: numWeeks }).map((_, colIndex) => {
							const index = colIndex * 7 + rowIndex;
							const time = Math.floor(start.getTime() / 1000) + (index - offSet) * 24 * 60 * 60;
							const bg = index >= offSet && index - offSet < numDays ? time in data ? "" : "!bg-tertiary" : "!bg-secondary";
							const count = time in data ? data[time] : 0;
							const color = count < 3 ? "#006620" : count < 5 ? "#019927" : count < 10 ? "#24c241" : "#7be187";
							return (
								<td
									className={`p-1.5 rounded-sm ${bg}`}
									key={colIndex}
									style={{
										backgroundColor: color
									}}
								/>
							);
						})}
					</tr>
				))}
			</tbody>
        </table>
    );
}
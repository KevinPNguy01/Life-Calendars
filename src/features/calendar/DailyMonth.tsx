export function DailyMonth({start, data, offSet, numDays, numWeeks, colors, unit}: {start: Date, data: Record<string, number>, offSet: number, numDays: number, numWeeks: number, colors: [number, string][], unit: string}) {
	return (
        <table className="border-separate border-spacing-[0.1875rem]">
			<tbody>
				{Array.from({ length: 7 }).map((_, rowIndex) => (
					<tr key={rowIndex}>
						{Array.from({ length: numWeeks }).map((_, colIndex) => {
							const index = colIndex * 7 + rowIndex;
							const time = Math.floor(start.getTime() / 1000) + (index - offSet) * 24 * 60 * 60;
							const bg = index >= offSet && index - offSet < numDays ? time in data ? "group" : "!bg-tertiary group" : "!bg-secondary";
							const count = time in data ? Math.round(data[time] * 100) / 100 : 0;
							const formattedDate = new Date(time * 1000).toLocaleString("UTC", { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
							let color = "";
							colors.forEach(([val, col]) => {
								if (count >= val) {
									color = col;
								}
							});
							return (
								<td
									className={`p-1.5 rounded-sm ${bg} relative cursor-pointer`}
									key={colIndex}
									style={{
										backgroundColor: color
									}}
								>
									<span className="text-sm text-nowrap border border-quaternary bg-tertiary rounded left-1/2 -translate-x-1/2 -translate-y-1/4 bottom-full py-0.5 px-2 z-10 absolute hidden group-hover:block">
										{`${count} ${unit} on ${formattedDate}`}
									</span>
								</td>
							);
						})}
					</tr>
				))}
			</tbody>
        </table>
    );
}
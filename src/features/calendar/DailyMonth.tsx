import { useState } from "react";

type Position = {
    top: number;
    left: number;
};

export function DailyMonth({start, data, offSet, numDays, numWeeks, colors, unit}: {start: Date, data: Record<string, number>, offSet: number, numDays: number, numWeeks: number, colors: [number, string][], unit: string}) {
	const [position, setPosition] = useState<Position | null>(null);
    const [isVisible, setIsVisible] = useState(false);
	const [hoverText, setHoverText] = useState("");

    const handleMouseEnter  = (text: string) => (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
		setHoverText(text);
        setPosition({
            top: rect.top,
            left: rect.left + rect.width,
        });
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        setIsVisible(false);
		setHoverText("");
    };
	
	return (
		<>
		{isVisible && position && (
			<span 
				className="text-sm text-nowrap border border-quaternary bg-tertiary rounded py-0.5 px-2 z-10 -translate-x-1/2 -translate-y-full"
				style={{
					position: "fixed",
					top: position.top,
					left: position.left,
					boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
					zIndex: 10,
				}}
			>
				{hoverText}
			</span>
		)}
        <table className="border-separate border-spacing-[0.1875rem]">
			<tbody>
				{Array.from({ length: 7 }).map((_, rowIndex) => (
					<tr key={rowIndex}>
						{Array.from({ length: numWeeks }).map((_, colIndex) => {
							const index = colIndex * 7 + rowIndex;
							const time = Math.floor(start.getTime() / 1000) + (index - offSet) * 24 * 60 * 60;
							const bg = index >= offSet && index - offSet < numDays ? time in data ? "group cursor-pointer" : "!bg-tertiary group cursor-pointer" : "!bg-secondary";
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
									className={`p-1.5 rounded-sm ${bg} relative`}
									key={colIndex}
									style={{
										backgroundColor: color
									}}
									onMouseEnter={handleMouseEnter(`${count} ${unit} on ${formattedDate}`)}
									onMouseLeave={handleMouseLeave}
								>
								</td>
							);
						})}
					</tr>
				))}
			</tbody>
        </table>
		</>
    );
}
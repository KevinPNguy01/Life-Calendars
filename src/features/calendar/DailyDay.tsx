import Tooltip from "@mui/material/Tooltip/Tooltip";

export function DailyDay({inRange, time, value, color, unit}: {inRange: boolean, time: number, value: number, color: string, unit: string}) {
    if (!inRange) return <td className={`p-1.5 rounded-sm`}/>
    
    const formattedDate = new Date(time * 1000).toLocaleString("UTC", { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

    return (
        <Tooltip 
            title={inRange ? `${value} ${unit} on ${formattedDate}` : ""} 
            disableInteractive
            slotProps={{
                popper: {
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, -12],
                            },
                        },
                    ],
                },
            }}
            placement="top"
        >
            <td
                className="p-1.5 rounded-sm bg-tertiary group cursor-pointer"
                style={color ? {backgroundColor: color}: {}}
            />
        </Tooltip>
    );
}
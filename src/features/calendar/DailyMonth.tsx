export function DailyMonth({data, offSet, numWeeks}: {data: number[], offSet: number, numWeeks: number}) {
    return (
        <table className="border-separate border-spacing-0.5">
          <tbody>
            {Array.from({ length: 7 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: numWeeks }).map((_, colIndex) => {
                    const index = colIndex * 7 + rowIndex;
                    return (
                        <td
                            className={`p-1.5 rounded-sm ${index >= offSet && index - offSet < data.length ? "bg-primary" : "bg-secondary"}`}
                            key={colIndex}
                        >
                        </td>
                    );
                })}
              </tr>
            ))}
          </tbody>
        </table>
    );
}
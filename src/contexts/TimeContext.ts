import { createContext } from "react";

export const TimeContext = createContext({
	timePeriod: [new Date(), new Date()],
	setTimePeriod: (dates: [Date, Date]) => {console.log(dates)}
});
export const pastYearEnd = new Date();
pastYearEnd.setDate(pastYearEnd.getDate() + 1);
pastYearEnd.setHours(0, 0, 0, 0);

export const pastYearStart = new Date(pastYearEnd);
pastYearStart.setFullYear(pastYearEnd.getFullYear() - 1, pastYearEnd.getMonth(), pastYearEnd.getDate() + 1);
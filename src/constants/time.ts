export const pastYearEnd = new Date();
pastYearEnd.setUTCDate(pastYearEnd.getUTCDate() + 1);
pastYearEnd.setUTCHours(0, 0, 0, 0);

export const pastYearStart = new Date(pastYearEnd);
pastYearStart.setUTCFullYear(pastYearEnd.getUTCFullYear() - 1, pastYearEnd.getUTCMonth(), pastYearEnd.getUTCDate() + 1);
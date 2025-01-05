export type User = {
    contributionsCollection: {
        contributionCalendar: {
            weeks: {
                contributionDays: {
                    contributionCount: number
                }[]
            }[]
        }
    }
};
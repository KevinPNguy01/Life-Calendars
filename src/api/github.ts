import { User } from "./types/github_types";

const username = import.meta.env.VITE_GITHUB_USERNAME;
const accessToken = import.meta.env.VITE_GITHUB_ACCESS_TOKEN;
const graphqlUrl = "https://us-central1-kevins-life-stats.cloudfunctions.net/graphqlProxy";
const endpoint = `https://api.github.com/graphql`;

export async function fetchGithub(year: number): Promise<User> {
	const start = new Date(Date.UTC(year, 0, 1));
	const end = new Date(Date.UTC(year + 1, 0, 0));
	const query = `query {
		user(login: "${username}") {
			contributionsCollection (from: "${start.toISOString()}" to: "${end.toISOString()}") {
				contributionCalendar {
					weeks {
						contributionDays {
							contributionCount
						}
					}
				}
			}
		}
	}`;
	const response = await fetch(graphqlUrl, {
		method: "POST",
		headers: { 
			"Content-Type": "application/json" ,
			"Authorization": `Bearer ${accessToken}`
		},
		body: JSON.stringify({
			endpoint,
			query,
		}),
	});
	const json = await response.json();
	return json.data.user;
};

export const parseGithub = (user: User, start: Date) => {
	const data: Record<string, number> = {};
	user.contributionsCollection.contributionCalendar.weeks.forEach(
		(week, weekIndex) => week.contributionDays.forEach(
			(day, dayIndex) => {
				const index = weekIndex * 7 + dayIndex - (weekIndex === 0 ? 0 : start.getUTCDay());
				const time = Math.floor(start.getTime() / 1000) + index * 24 * 60 * 60;
				const contributions = day.contributionCount;
				if (contributions > 0) {
					data[`${time}`] = contributions;
				}
			}
		)
	)
	return data;
}
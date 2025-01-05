import { User } from "./types/github_types";


const accessToken = import.meta.env.VITE_GITHUB_ACCESS_TOKEN;
const graphqlUrl = "https://us-central1-kevins-life-stats.cloudfunctions.net/graphqlProxy";
const endpoint = `https://api.github.com/graphql`;
const query = `query {
  viewer {
   	contributionsCollection {
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
const variables = `{"username": "nguyk1", "year": 2024}`;

export const fetchGithub = async () => {
    const response = await fetch(graphqlUrl, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json" ,
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            endpoint,
            query,
            variables
        }),
    });
    const json = await response.json();
    return json;
};

export const parseGithub = (user: User) => {
    const data: Record<string, number> = {};
    const start = new Date(Date.UTC(2024, 0, 1));
    console.log(start, start.getUTCDay())
    user.contributionsCollection.contributionCalendar.weeks.forEach(
        (week, weekIndex) => week.contributionDays.forEach(
            (day, dayIndex) => {
                const index = weekIndex * 7 + dayIndex - start.getUTCDay();
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
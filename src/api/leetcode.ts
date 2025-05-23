const graphqlUrl = "https://us-central1-my-life-calendars.cloudfunctions.net/graphqlProxy";
const endpoint = `https://leetcode.com/graphql`;
const query = `
	query userProfileCalendar($username: String!, $year: Int) {
		matchedUser(username: $username) {
			userCalendar(year: $year) {
				submissionCalendar
			}
		}
	}
`;

export const fetchLeetcode = async (username: string, year: number) => {
    const response = await fetch(graphqlUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            endpoint,
            query,
            variables: {
              "username": username, 
              "year": year
            }
        }),
    });
    const json = await response.json();
    const data = JSON.parse(json.data.matchedUser.userCalendar.submissionCalendar);
    return data;
};
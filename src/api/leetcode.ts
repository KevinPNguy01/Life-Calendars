const graphqlUrl = "https://us-central1-kevins-life-stats.cloudfunctions.net/graphqlProxy";
const endpoint = `https://leetcode.com/graphql`;
const query = `query userProfileCalendar($username: String!, $year: Int) {
  matchedUser(username: $username) {
    userCalendar(year: $year) {
      submissionCalendar
    }
  }
}`;
const variables = `{"username": "nguyk1", "year": 2024}`;

export const fetchLeetcode = async () => {
    const response = await fetch(graphqlUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            endpoint,
            query,
            variables
        }),
    });
    const json = await response.json();
    const data = JSON.parse(json.data.matchedUser.userCalendar.submissionCalendar);
    return data;
};
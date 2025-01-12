import { createContext } from "react";

export const UserContext = createContext({
    username: "Kevin",
    setUsername: (username: string) => {console.log(username)},
    leetcodeUsername: "nguyk1",
    setLeetcodeUsername: (username: string) => {console.log(username)},
    githubUsername: "KevinPNguy01",
    setGithubUsername: (username: string) => {console.log(username)},
});
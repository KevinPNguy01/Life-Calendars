import { ThemeProvider } from '@mui/material';
import { useState } from 'react';
import GitHubLogo from './assets/github_logo.png';
import LeetCodeLogo from './assets/leetcode_logo.png';
import StravaLogo from './assets/strava_logo.png';
import { SettingsButton } from './components/SettingsButton';
import { TimeSelect } from './components/TimeSelect';
import { TimeContext } from './contexts/TimeContext';
import { UserContext } from './contexts/UserContext';
import { ViewContext, ViewContextType } from './contexts/ViewContext';
import { ConnectButton } from './features/authentication/ConnectDialog';
import { GitHubStats } from './features/stat_cards/GitHubStats';
import { LeetCodeStats } from './features/stat_cards/LeetCodeStats';
import { StravaStats } from './features/stat_cards/StravaStats';
import { theme } from './theme';
import { pastYearEnd, pastYearStart } from './utils/time';

function App() {
	const [timePeriod, setTimePeriod] = useState([pastYearStart, pastYearEnd]);
	const [username, setUsername] = useState("Kevin");
	const [leetcodeUsername, setLeetcodeUsername] = useState("nguyk1");
	const [githubUsername, setGithubUsername] = useState("KevinPNguy01");
	const [stravaId, setStravaId] = useState("56713265");
	const [views, setViews] = useState({strava: true, leetcode: true, github: true});
	const setView = (key: keyof ViewContextType["views"], value: boolean) => {
        setViews({ ...views, [key]: value });
    };

	return (
		<ThemeProvider theme={theme}>
			<UserContext.Provider value={{username, setUsername, leetcodeUsername, setLeetcodeUsername, githubUsername, setGithubUsername, stravaId, setStravaId}}>
			<TimeContext.Provider value={{timePeriod, setTimePeriod}}>
			<ViewContext.Provider value={{views, setView}}>
				<nav className="w-full p-4 flex justify-end gap-4 items-center">
					<ConnectButton/>
					<SettingsButton/>
				</nav>
				<div className="w-full flex-grow flex flex-col items-center justify-center gap-4 pb-20">
					<TimeSelect/>
					<div className="max-w-full h-fit text-white flex flex-col 2xl:grid 2xl:pr-20 grid-cols-[auto,1fr] place-items-center items-center gap-x-8 gap-y-4">
						<img className={`pt-4 2xl:pt-0 w-32 ${!views.strava ? "hidden" : ""}`} src={StravaLogo}/>
						<div className={views.strava ? "visible" : "hidden"}><StravaStats/></div>
						<img className={`pt-4 2xl:pt-0 w-32 ${!views.leetcode ? "hidden" : ""}`} src={LeetCodeLogo}/>
						<div className={views.leetcode ? "visible" : "hidden"}><LeetCodeStats/></div>
						<img className={`pt-4 2xl:pt-0 w-32 ${!views.github ? "hidden" : ""}`} src={GitHubLogo}/>
						<div className={views.github ? "visible" : "hidden"}><GitHubStats/></div>
					</div>
				</div>
			</ViewContext.Provider>
			</TimeContext.Provider>
			</UserContext.Provider>
		</ThemeProvider>
	);
}

export default App;
import { GitHubStats } from './features/stat_cards/GitHubStats';
import { LeetCodeStats } from './features/stat_cards/LeetCodeStats';
import { StravaStats } from './features/stat_cards/StravaStats';
import GitHubLogo from './assets/github_logo.png';
import LeetCodeLogo from './assets/leetcode_logo.png';
import StravaLogo from './assets/strava_logo.png';
import { createContext, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { TimeSelect } from './components/TimeSelect';
import { pastYearEnd, pastYearStart } from './utils/time';

export const TimeContext = createContext({
	timePeriod: [new Date(), new Date()],
	setTimePeriod: (_: [Date, Date]) => {}
});

function App() {
	const [timePeriod, setTimePeriod] = useState([pastYearStart, pastYearEnd]);

	return (
		<ThemeProvider theme={theme}>
			<TimeContext.Provider value={{timePeriod, setTimePeriod}}>
				<div className="w-full h-fit flex flex-col items-center justify-center gap-4 p-4">
					<TimeSelect/>
					<div className="max-w-full h-fit text-white flex flex-col 2xl:grid 2xl:pr-20 grid-cols-[auto,1fr] place-items-center items-center gap-x-8 gap-y-4">
						<img className="pt-4 2xl:pt-0 w-32" src={StravaLogo}/>
						<StravaStats/>
						<img className="pt-4 2xl:pt-0 w-32" src={LeetCodeLogo}/>
						<LeetCodeStats/>
						<img className="pt-4 2xl:pt-0 w-32" src={GitHubLogo}/>
						<GitHubStats/>
					</div>
				</div>
			</TimeContext.Provider>
		</ThemeProvider>
	);
}

export default App;
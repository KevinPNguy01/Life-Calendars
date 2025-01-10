import { GitHubStats } from './components/GitHubStats';
import { LeetCodeStats } from './components/LeetCodeStats';
import { StravaStats } from './components/StravaStats';
import GitHubLogo from './assets/github_logo.png';
import LeetCodeLogo from './assets/leetcode_logo.png';
import StravaLogo from './assets/strava_logo.png';

function App() {
	const temp = new Date();
	const endDate = new Date(Date.UTC(temp.getFullYear(), temp.getMonth(), temp.getDate()+1));
	const startDate = new Date(Date.UTC(endDate.getFullYear()-1, endDate.getMonth(), endDate.getDay()));
	return (
		<div className="w-screen h-screen flex items-center justify-center">
			<div className="text-white grid grid-cols-[auto,1fr] place-items-center gap-x-8 gap-y-4">
				<img className="h-8" src={StravaLogo}/>
				<StravaStats startDate={startDate} endDate={endDate}/>
				<img className="h-12" src={LeetCodeLogo}/>
				<LeetCodeStats startDate={startDate} endDate={endDate}/>
				<img className="h-12" src={GitHubLogo}/>
				<GitHubStats startDate={startDate} endDate={endDate}/>
			</div>
		</div>
	);
}

export default App

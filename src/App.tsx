import { GitHubStats } from './components/GitHubStats';
import { LeetCodeStats } from './components/LeetCodeStats';
import { StravaStats } from './components/StravaStats';

function App() {
	const temp = new Date();
	const endDate = new Date(Date.UTC(temp.getFullYear(), temp.getMonth(), temp.getDate()+1));
	const startDate = new Date(Date.UTC(endDate.getFullYear()-1, endDate.getMonth(), endDate.getDay()));
	return (
		<div className="w-screen h-screen bg-secondary text-white flex flex-col justify-center">
			<StravaStats startDate={startDate} endDate={endDate}/>
			<LeetCodeStats startDate={startDate} endDate={endDate}/>
			<GitHubStats startDate={startDate} endDate={endDate}/>
		</div>
	);
}

export default App

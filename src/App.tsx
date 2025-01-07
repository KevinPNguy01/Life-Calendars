import { GitHubStats } from './components/GitHubStats';
import { LeetCodeStats } from './components/LeetCodeStats';
import { StravaStats } from './components/StravaStats';
import { DailyCalendar } from './features/calendar/DailyCalendar';

function App() {
	return (
		<div className="w-screen h-screen bg-secondary text-white flex flex-col justify-center">
			<StravaStats year={2024}/>
			<LeetCodeStats year={2024}/>
			<GitHubStats year={2024}/>
		</div>
	);
}

export default App

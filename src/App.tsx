import { GitHubStats } from './components/GitHubStats';
import { LeetCodeStats } from './components/LeetCodeStats';
import { DailyCalendar } from './features/calendar/DailyCalendar';

function App() {
	return (
		<div className="w-screen h-screen bg-secondary text-white flex flex-col justify-center">
			<LeetCodeStats year={2024}/>
			<GitHubStats year={2024}/>
		</div>
	);
}

export default App

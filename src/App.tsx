import { DailyCalendar } from './features/calendar/DailyCalendar';

function App() {
	return (
		<div className="w-screen h-screen bg-secondary text-white">
			<DailyCalendar year={2024}/>
		</div>
	);
}

export default App

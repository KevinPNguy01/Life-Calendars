import { GitHubStats } from './components/GitHubStats';
import { LeetCodeStats } from './components/LeetCodeStats';
import { StravaStats } from './components/StravaStats';
import GitHubLogo from './assets/github_logo.png';
import LeetCodeLogo from './assets/leetcode_logo.png';
import StravaLogo from './assets/strava_logo.png';
import Select, { SelectChangeEvent } from '@mui/material/Select/Select';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import { useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';

function App() {
	const temp = new Date();
	const endDate = new Date(Date.UTC(temp.getFullYear(), temp.getMonth(), temp.getDate()+1));
	const startDate = new Date(Date.UTC(endDate.getFullYear()-1, endDate.getMonth(), endDate.getDate()+1));

	const [timePeriod, setTimePeriod] = useState<[Date, Date]>([startDate, endDate]);
	const [value, setValue] = useState(-1);
	const handleChange = (e: SelectChangeEvent<number>) => {
		const year = e.target.value as number;
		setValue(year);
		if (year === -1) {
			setTimePeriod([startDate, endDate]);
		} else {
			setTimePeriod([new Date(Date.UTC(year)), new Date(Date.UTC(year+1))]);
		}
	}

	return (
		<ThemeProvider theme={theme}>
			<div className="w-screen h-screen flex flex-col items-center justify-center gap-4">
				<div className="flex items-center gap-2">
					<p className="text-dim-white text-lg pb-[3px]">Kevin's Life Stats in</p>
					<div>
						<Select
							className="!bg-tertiary rounded"
							variant="standard"
							disableUnderline
							sx={{
								'& .MuiSelect-select': {
								paddingX: 1,
								paddingY: 0.5
								}
							}}
							labelId="time-period-label"
							onChange={handleChange}
							value={value}
						>
							<MenuItem value={-1}>the past year</MenuItem>
							{Array.from({ length: temp.getFullYear() - 2018}, (_, i) => temp.getFullYear() - i).map(
								year => <MenuItem key={year} value={year}>{year}</MenuItem>
							)}
						</Select>
					</div>
				</div>
				<div className="text-white grid grid-cols-[auto,1fr] place-items-center gap-x-8 gap-y-4">
					<img className="w-32" src={StravaLogo}/>
					<StravaStats startDate={timePeriod[0]} endDate={timePeriod[1]}/>
					<img className="w-32" src={LeetCodeLogo}/>
					<LeetCodeStats startDate={timePeriod[0]} endDate={timePeriod[1]}/>
					<img className="w-32" src={GitHubLogo}/>
					<GitHubStats startDate={timePeriod[0]} endDate={timePeriod[1]}/>
				</div>
			</div>
		</ThemeProvider>
	);
}

export default App

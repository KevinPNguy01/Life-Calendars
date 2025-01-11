import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
		mode: 'dark',
		primary: {
			main: '#555',
		},
		text: {
			primary: 'rgba(255,255,255,0.87)',
		},
		background: {
			paper: '#222',
			default: '#333',
		},
    },
});
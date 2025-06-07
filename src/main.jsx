import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css'; 
import { ThemeProvider, createTheme } from '@mui/material/styles'; 
import CssBaseline from '@mui/material/CssBaseline'; 


const getAppTheme = (mode) =>
  createTheme({
    palette: {
      mode: mode, // 'light' o 'dark'
    
       primary: {
         main: mode === 'light' ? '#3f51b5' : '#90caf9',
      },
       secondary: {
         main: mode === 'light' ? '#f50057' : '#f48fb1',
       },
       background: {
         default: mode === 'light' ? 'var(--color-primary)' : 'var(--color-primary)',
         paper: mode === 'light' ? 'var(--color-card-bg)' : 'var(--color-card-bg)',
       },
       text: {
         primary: mode === 'light' ? 'var(--color-text)' : 'var(--color-text)',
         secondary: mode === 'light' ? 'var(--color-text-light)' : 'var(--color-text-light)',
       },
    },
  
     components: {
       MuiPaper: {
         styleOverrides: {
           root: ({ theme }) => ({
             backgroundColor: theme.palette.background.paper,
             color: theme.palette.text.primary,
          }),
         },
      },
     },
  });


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> 
  </StrictMode>,
);
// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0A1929', // Dark blue background
      paper: '#132F4C',   // Slightly lighter blue for paper elements
    },
    primary: {
      main: '#3399FF',    // Bright blue for primary elements
    },
    secondary: {
      main: '#19857b',    // Teal for secondary elements
    },
    text: {
      primary: '#FFFFFF', // White for primary text
      secondary: '#B2BAC2', // Light grey for secondary text
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
    },
    body2: {
      fontWeight: 400,
      fontSize: '0.875rem',
    },
  },
});

export default theme;
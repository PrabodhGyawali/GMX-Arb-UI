// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '##0E1A37', // Dark blue background
      paper: '#1C274C',   // Slightly lighter blue for paper elements
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
    success: {
      main: '#00FF00',    // Green for success elements
      light: '#0B6623',   // Light green for success elements
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: '5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '3rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.6,
      marginBottom: '0.75rem',
    },
    body2: {
      fontWeight: 400,
      fontSize: '0.875rem',
    },
  },
});

export default theme;


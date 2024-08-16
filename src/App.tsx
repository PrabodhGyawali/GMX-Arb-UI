// import Account from './Account'
import Logs from './components/Logs'
import PositionMonitor from './components/PositionMonitor'
import NavBarSide from './components/NavBarSide';
import { Box, createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    background: {
      paper: '#fff',
    },
    text: {
      primary: '#201E43',
      secondary: '#134B70',
      tertiary: '#508C9B',
      quaternary: '#EEEEEE'
    },
    action: {
      active: '#001E3C',
    },
    // success: {
    //   dark: '#009688',
    // },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box className="app" sx={{display: 'flex', flexDirection: 'row', height:'100vh', width:'100vw'}}>
        <NavBarSide />
        <Box className="app-main" sx={{
          display:'flex', height: '100vh', width: '100vw', justifyContent: 'space-between', padding: '0.75em'
        }}>
          <PositionMonitor />
          <Logs />
        </Box>
      </Box>
    </ThemeProvider>
    
  )
}

export {App, theme}


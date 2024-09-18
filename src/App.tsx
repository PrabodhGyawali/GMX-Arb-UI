import PositionMonitor from './components/PositionMonitor';
import NavBarSide from './components/NavBarSide';
import {DevDialog} from './DevComponent';
import { useSocket } from './Context/SocketContext';
import { useEffect } from 'react';
import { Box } from '@mui/material';
import {TokenPriceChart} from './Charts/TokenPriceChart.tsx';
function App() {
  const { connected } = useSocket();

  useEffect(() => {
    // Check whether the user needs to do an onboarding
    if (localStorage.getItem('onboarding') != 'completed') {
      window.location.href = '/onboarding';
    }
  });
  
  return (
      <Box className="app" sx={{
          display: 'flex', height:'100vh', width: '100vw',
          justifyContent: 'flex-start', alignItems: 'stretch',
          overflowX: 'hidden',
          overflowY: 'hidden',
        }}>

        <NavBarSide isConnected={connected} />
        <Box className="app-main" sx={{
          display:'flex', flexDirection:'column-reverse', justifyContent: 'space-between',
          height: '100vh', width: '100vw', padding: '0', margin: '0em',
        }}>
          
          <PositionMonitor />
          <TokenPriceChart />
          <DevDialog />
        </Box>
      </Box>    
  )
}

export default App


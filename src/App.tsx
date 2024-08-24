import React, { useEffect} from 'react';
import io from 'socket.io-client';
import Logs from './components/Logs';
import PositionMonitor from './components/PositionMonitor';
import NavBarSide from './components/NavBarSide';
import { Box } from '@mui/material';

function App() {
  useEffect(() => {
    // Listen for the 'log' event from the server
    const socket = io("http://localhost:5000");
    socket.on('log', (data: any) => {
      console.log("log event received");
    });
    
    return () => {
      socket.disconnect();
    }
  }, []);

  return (
      <Box className="app" sx={{display: 'flex', flexDirection: 'row', height:'100vh', width:'100vw'}}>
        <NavBarSide />
        <Box className="app-main" sx={{
          display:'flex', flexDirection:'column', height: '100vh', width: '100vw', justifyContent: 'space-between', padding: '0.75em'
        }}>
          <PositionMonitor />
          <Logs />
        </Box>
      </Box>    
  )
}

export default App


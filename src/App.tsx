import useSocket from './socket';
import Logs from './components/Logs';
import PositionMonitor from './components/PositionMonitor';
import NavBarSide from './components/NavBarSide';
import { Box } from '@mui/material';

function App() {
  const {eventLog, isConnected} = useSocket();

  return (
      <Box className="app" sx={{display: 'flex', flexDirection: 'row', height:'100vh', width:'100vw'}}>

        <NavBarSide isConnected={isConnected} />
        <Box className="app-main" sx={{
          display:'flex', flexDirection:'column', height: '100vh', width: '100vw', justifyContent: 'space-between', padding: '0.75em'
        }}>
          <PositionMonitor />
          <Logs 
            eventLogs={eventLog} />
        </Box>
      </Box>    
  )
}

export default App


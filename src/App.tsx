import PositionMonitor from './components/PositionMonitor';
import NavBarSide from './components/NavBarSide';
import { Box } from '@mui/material';
import { useSocket } from './Context/SocketContext';


function App() {
  const { connected } = useSocket();
  
  return (
      <Box className="app" sx={{
          display: 'flex', height:'100vh', width: '100vw',
          justifyContent: 'flex-start', alignItems: 'stretch',
          overflowX: 'hidden',
          overflowY: 'hidden',
        }}>

        <NavBarSide isConnected={connected} />
        <Box className="app-main" sx={{
          display:'flex', flexDirection:'column', justifyContent: 'space-between',
          height: '100vh', width: '100vw', padding: '0', margin: '0em',
        }}>
          <PositionMonitor />
        </Box>
      </Box>    
  )
}

export default App


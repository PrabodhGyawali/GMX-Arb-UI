import PositionMonitor from './components/PositionMonitor';
import NavBarSide from './components/NavBarSide';
import {DevDialog} from './DevComponent';
import BoxA from './styledComponent/Divs/BoxA';
import { useSocket } from './Context/SocketContext';
import { useEffect } from 'react';

function App() {
  const { connected } = useSocket();

  useEffect(() => {
    // Check whether the user needs to do an onboarding
    if (localStorage.getItem('onboarding') != 'completed') {
      window.location.href = '/onboarding';
    }
  });
  
  return (
      <BoxA className="app" sx={{
          display: 'flex', height:'100vh', width: '100vw',
          justifyContent: 'flex-start', alignItems: 'stretch',
          overflowX: 'hidden',
          overflowY: 'hidden',
        }}>

        <NavBarSide isConnected={connected} />
        <BoxA className="app-main" sx={{
          display:'flex', flexDirection:'column', justifyContent: 'space-between',
          height: '100vh', width: '100vw', padding: '0', margin: '0em',
        }}>
          <PositionMonitor />
          <DevDialog />
        </BoxA>
      </BoxA>    
  )
}

export default App


import {DeployCollateral, Run} from '../components/CLIFunctions'
import {SettingsButton} from './Settings'
import { useNavigate } from 'react-router-dom'
import { Box, IconButton } from '@mui/material'
import BotStatusIndicator from './NavBarSide/BotStatusIndicator';

function NavBarSide({isConnected}: {isConnected: boolean}) {
    const navigateHome = useNavigate();
    return (
      <Box className="nav" sx={{
        display: 'flex', flexDirection:'column', justifyContent: 'space-between', 
        alignItems: 'center',
        height:'100vh',
        width: '20vw',
      }}>
        <Box className="nav-top" sx={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '1em',
        }}>
          <IconButton sx={{paddingLeft: "1em"}} onClick={() => {navigateHome("/")}}>
            <img src="../public/svg/gmx-logo.svg" alt="" style={{width:'3em', height:'3em'}}/>
          </IconButton>
          <SettingsButton/>
        </Box>
        <Run />
        <BotStatusIndicator isConnected={isConnected}/>
        <DeployCollateral />   
      </Box>
    )
}

export default NavBarSide;


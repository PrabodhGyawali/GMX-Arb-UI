import CLIFunctions from '../components/CLIFunctions'
import {SettingsButton} from './Settings'
import { useNavigate } from 'react-router-dom'
import { Box, IconButton } from '@mui/material'
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';

function NavBarSide() {
    const navigateHome = useNavigate();
    return (
        <Box className="side-bar" sx={{
          display: 'flex', flexDirection:'column', justifyContent: 'space-between', padding: '0.5em', height:'100vh'
        }}>
        <Box className="side-bar-top" sx={{
          display: 'flex', justifyContent: 'space-around'
        }}>
          <IconButton>
            <img onClick={() => {navigateHome("/")}} src="../public/svg/gmx-logo.svg" alt="" style={{width:'3em', height:'3em'}}/>
          </IconButton>
          <IconButton>
            <KeyboardTabIcon/>
          </IconButton>
        </Box>
        
        <CLIFunctions />
        <SettingsButton/> 
      </Box>
    )
}

export default NavBarSide;

// TODO: Add GMX button click effect

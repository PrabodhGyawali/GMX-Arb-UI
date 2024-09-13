import { DeployCollateral, Run } from '../components/CLIFunctions';
import { SettingsButton } from './Settings';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, useTheme, useMediaQuery } from '@mui/material';
import BotStatusIndicator from './NavBarSide/BotStatusIndicator';

function NavBarSide({ isConnected }: { isConnected: boolean }) {
  const navigateHome = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      className="nav"
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'row' : 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: isMobile ? 'auto' : '100vh',
        width: isMobile ? '100%' : '20vw',
        minWidth: isMobile ? 'auto' : '200px',
        maxWidth: isMobile ? 'none' : '300px',
        padding: isMobile ? '1em' : '2em 1em',
        flexWrap: isMobile ? 'wrap' : 'nowrap',
      }}
    >
      <Box
        className="nav-top"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: '1em',
          flexDirection: isMobile ? 'row' : 'column',
        }}
      >
        <IconButton
          sx={{ padding: isMobile ? '0.5em' : '1em' }}
          onClick={() => {
            navigateHome('/');
          }}
        >
          <img
            src="/svg/gmx-logo.svg"
            alt=""
            style={{ width: isMobile ? '2em' : '3em', height: isMobile ? '2em' : '3em' }}
          />
        </IconButton>
        <SettingsButton />
      </Box>
      <Run />
      <BotStatusIndicator isConnected={isConnected} />
      <DeployCollateral />
    </Box>
  );
}

export default NavBarSide;
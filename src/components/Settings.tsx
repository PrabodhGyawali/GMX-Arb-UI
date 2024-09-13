import React, { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { 
  IconButton, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Button,
  Tabs,
  Tab,
  Box,
  Tooltip
} from "@mui/material";
import BotSettings from './Settings/BotSettings';
import WalletSettings from './Settings/WalletSettings';
import ExchangeSettings from './Settings/ExchangeSettings';
import BotStatusIndicator from './NavBarSide/BotStatusIndicator';
import { useSocket } from '../Context/SocketContext';
import { ConnectToBot } from '../onboarding/components/InstallationSteps';
/**
 * Navbar button to access settings dialog
 */
const SettingsButton: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
    };

    return (
        <>
            <IconButton onClick={handleOpen}>
                <SettingsIcon sx={{ fontSize: 40 }} /> 
            </IconButton>
            <SettingsDialog open={open} onClose={handleClose} />
        </>
    );
}

interface SettingsDialogProps {
    open: boolean;
    onClose: () => void;
}


const SettingsDialog: React.FC<SettingsDialogProps> = ({ open, onClose }) => {
    const [tabValue, setTabValue] = useState<number>(0);
    const { connected } = useSocket();
    const [socketDialogMessage, setSocketDialogMessage] = useState(false);

    const handleTabChange = ( newValue: number): void => {
        setTabValue(newValue);
    };

    const socketDialog = () => (
        <Dialog open={socketDialogMessage} onClose={() => setSocketDialogMessage(false)}>
            <DialogTitle>Bot Status</DialogTitle>
            <DialogContent>
                <ConnectToBot />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setSocketDialogMessage(false)}>Close</Button>
            </DialogActions>
        </Dialog>
    );

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignContent: 'center'}}>
                <DialogTitle>Settings</DialogTitle>
                <Tooltip title="Make sure that you are connected to bot to get current settings and set the settings">
                    <IconButton onClick={() => setSocketDialogMessage(prev => !prev)}>
                        <BotStatusIndicator isConnected={connected} />
                    </IconButton>
                </Tooltip>
            </Box>
            {socketDialog()}
            <DialogContent>
                <Tabs value={tabValue} onChange={() => handleTabChange(tabValue)}>
                    <Tab label="Exchange" onClick={() => setTabValue(0)} />
                    <Tab label="Bot" onClick={() => setTabValue(1)} />
                    <Tab label="Env" onClick={() => setTabValue(2)} />
                </Tabs>
                <Box sx={{ mt: 2 }}>
                    {tabValue === 0 && <ExchangeSettings />} {/* <ExchangeSettings /> */}
                    {tabValue === 1 && <BotSettings /> } {/* <BotSettings /> */}
                    {tabValue === 2 && <WalletSettings  />} {/* <EnvSettings /> */}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}


export { SettingsButton };
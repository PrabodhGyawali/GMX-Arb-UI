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
  Box
} from "@mui/material";
import BotSettings from './Settings/BotSettings';

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

    const handleTabChange = ( newValue: number): void => {
        setTabValue(newValue);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Settings</DialogTitle>
            <DialogContent>
                <Tabs value={tabValue} onChange={() => handleTabChange(tabValue)}>
                    <Tab label="Exchange" />
                    <Tab label="Bot" />
                    <Tab label="Env" />
                </Tabs>
                <Box sx={{ mt: 2 }}>
                    {tabValue === 0 && 'Exchange Settings go here'} {/* <ExchangeSettings /> */}
                    {tabValue === 1 && <BotSettings /> } {/* <BotSettings /> */}
                    {tabValue === 2 && 'Env Settings go here'} {/* <EnvSettings /> */}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

const Settings: React.FC = () => {
    return (
        <section className="MainSettings">
            
        </section>
    );
}


export { SettingsButton, Settings };
import React, { useState, useEffect } from 'react';
import { Typography, TextField, Box, Paper, 
          List, ListItem, ListItemIcon, ListItemText, 
          Stepper, Step, StepLabel, StepContent, Button,
          Dialog, DialogTitle, DialogContent, DialogActions, IconButton,
          Tooltip, FormControlLabel, Checkbox } from '@mui/material';
import { WalletConfig, NetworkType } from '../../onboarding/types';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useSocket } from '../../Context/SocketContext';

interface NetworkInfo {
  name: string;
  chainId: NetworkType;
  color: string;
}

const networks: NetworkInfo[] = [
  { name: 'Arbitrum One', chainId: NetworkType.Mainnet, color: '#28a0f0' },
  { name: 'Arbitrum Sepolia', chainId: NetworkType.Sepolia, color: '#8A2BE2' }
];

const AlchemySetupSteps = [
  {
    label: 'Create Alchemy Account',
    description: 'Go to Alchemy.com and sign up for a free account.',
  },
  {
    label: 'Create New App',
    description: 'Once logged in, click on "Create App" and select Arbitrum as the chain.',
  },
  {
    label: 'Get API Key',
    description: 'After creating the app, find and copy your API key.',
  },
  {
    label: 'Use as RPC URL',
    description: 'Use the Alchemy API key as your Arbitrum RPC URL in the field below.',
  },
];

const WalletSettings: React.FC = () => {
  const [walletConfig, setWalletConfig] = useState<WalletConfig>({
    address: '',
    arbitrum_rpc: '',
    network: null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof WalletConfig, string>>>({});
  const [privateKeyConfirmed, setPrivateKeyConfirmed] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [rpcDialog, setRpcDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const { connected } = useSocket();

  useEffect(() => {
    fetchWalletSettings();
  }, []);

  const fetchWalletSettings = async () => {
    try {
        const backendUrl = localStorage.getItem('backendUrl');
        const response = await fetch(`${backendUrl}/wallet-settings/get`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWalletConfig(data);
    } catch (error) {
        console.error('Error fetching wallet settings:', error);
    }
  };

  const handlePrivateKeyConfirmation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrivateKeyConfirmed(event.target.checked);
  };

  const validationRules: Partial<Record<keyof WalletConfig, { regex: RegExp; errorMessage: string }>> = {
    address: { 
        regex: /^0x[a-fA-F0-9]{40}$/, 
        errorMessage: 'Invalid Ethereum address format' 
    },
    arbitrum_rpc: { 
        regex: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, 
        errorMessage: 'Invalid URL format' 
    },
  };

  const validateField = (name: keyof WalletConfig, value: string | NetworkType | null): string => {
    if (value === null || value === '') return 'This field is required';
    
    if (name === 'address' || name === 'arbitrum_rpc') {
        const rule = validationRules[name];
        if (rule && typeof value === 'string') {
            return rule.regex.test(value) ? '' : rule.errorMessage;
        }
    }
    
    if (name === 'network') {
        return value === null ? 'A network must be selected' : '';
    }
    
    return '';
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newValue = name === 'chain_id_base' ? parseInt(value, 10) || 0 : value;
    
    setWalletConfig(prev => ({
      ...prev,
      [name]: newValue,
    }));

    const error = validateField(name as keyof WalletConfig, value);
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleNetworkSelect = (network: NetworkType) => {
    setWalletConfig(prev => ({ ...prev, network }));
    setErrors(prev => ({ ...prev, network: '' }));
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSave = async () => {
    try {
        const backendUrl = localStorage.getItem('backendUrl');
        const response = await fetch(`${backendUrl}/wallet-settings/save`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(walletConfig),
      });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        setConfirmDialog(false);
    } catch (error) {
        alert('Failed to save wallet settings');
    }
  };

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 3, my: 3, bgcolor: '#fff3e0' }}>
        <Typography variant="h6" gutterBottom><strong>IMPORTANT: Security Considerations</strong></Typography>
        <List>
          <ListItem>
            <ListItemIcon><WarningIcon color="error" /></ListItemIcon>
            <ListItemText primary="Never share your private key with anyone." />
          </ListItem>
          <ListItem>
            <ListItemIcon><InfoIcon color="primary" /></ListItemIcon>
            <ListItemText 
              primary="Review the backend client code"
              secondary="Make sure your private keys will be stored safely in python code. Ask trusted Developer or cyber security expert to review codebase."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon><WarningIcon color="warning" /></ListItemIcon>
            <ListItemText 
              primary="Using without review"
              secondary="You use this bot at your own risk and cannot hold developers liable for vulnerabilities."
            />
          </ListItem>
        </List>
      </Paper>

      <Tooltip
        title="We recommend using a new wallet address specifically for this bot. This practice isolates your trading activities and limits potential risks."
        arrow
        placement="top-start"
      >
        <TextField
          fullWidth
          margin="normal"
          name="address"
          label="Your New Wallet Address"
          value={walletConfig.address}
          onChange={handleChange}
          error={!!errors.address}
          helperText={errors.address}
          InputProps={{
            endAdornment: (
              <IconButton edge="end">
                <InfoOutlinedIcon color="primary" />
              </IconButton>
            ),
          }}
        />
      </Tooltip>

      <FormControlLabel
        control={
          <Checkbox
            checked={privateKeyConfirmed}
            onChange={handlePrivateKeyConfirmation}
            name="privateKeyConfirmed"
            color="primary"
          />
        }
        label={
          <Typography variant="body2">
            I confirm that I have added my private key to the required file and understand the security implications.
          </Typography>
        }
      />

      <Paper elevation={3} sx={{ p: 3, my: 3, bgcolor: '#f0f8ff' }}>
        <Typography variant="h6" gutterBottom><strong>Select Network</strong></Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', my: 2 }}>
          {networks.map((network) => (
            <Box key={network.chainId} sx={{ textAlign: 'center', width: '45%' }}>
              <Button
                onClick={() => handleNetworkSelect(network.chainId)}
                sx={{
                  width: '100%',
                  py: 2,
                  bgcolor: walletConfig.network === network.chainId 
                    ? '#1a1a1a'
                    : network.color,
                  color: '#ffffff',
                  '&:hover': {
                    bgcolor: walletConfig.network === network.chainId 
                      ? '#000000'
                      : '#4a4a4a',
                  },
                  transition: 'background-color 0.3s',
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {network.name}
                </Typography>
              </Button>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Chain ID: {network.chainId}
              </Typography>
            </Box>
          ))}
        </Box>
        {errors.network && (
          <Typography color="error" variant="caption">
            {errors.network}
          </Typography>
        )}
      </Paper>

      <Paper elevation={3} sx={{ p: 3, my: 3, bgcolor: '#e3f2fd' }}>
        <Typography variant="h6" gutterBottom><strong>Setting up <a href="https://alchemy.com">Alchemy</a> API Key</strong></Typography>
        <Stepper activeStep={activeStep} orientation="vertical">
          {AlchemySetupSteps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                {index === AlchemySetupSteps.length - 1 && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <TextField
                      fullWidth
                      margin="normal"
                      name="arbitrum_rpc"
                      label="Arbitrum RPC URL"
                      value={walletConfig.arbitrum_rpc}
                      onChange={handleChange}
                      error={!!errors.arbitrum_rpc}
                      helperText={errors.arbitrum_rpc}
                    />
                    <IconButton onClick={() => {setRpcDialog(prev => !prev)}} sx={{ ml: 1 }}>
                      <HelpOutlineIcon />
                    </IconButton>
                  </Box>
                )}
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                      disabled={index === AlchemySetupSteps.length - 1 && !!errors.arbitrum_rpc}
                    >
                      {index === AlchemySetupSteps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === AlchemySetupSteps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Paper>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setConfirmDialog(true)}
        disabled={!connected}
        sx={{ mt: 2 }}
      >
        Save Settings
      </Button>

      <Dialog open={rpcDialog} onClose={() => {setRpcDialog(prev => !prev)}} maxWidth="md" fullWidth>
        <DialogTitle>
          How to Find Your Alchemy API Key
          <IconButton
            aria-label="close"
            onClick={() => {setRpcDialog(prev => !prev)}}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <img 
            src="/Alchemy1.png" 
            alt="Alchemy API Key Guide" 
            style={{ width: '100%', height: 'auto' }} 
          />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Note that if you want to use the test network, you can select Sepolia net.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setRpcDialog(prev => !prev)}}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmDialog} onClose={() => setConfirmDialog(false)}>
        <DialogTitle>Confirm Save</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to save these wallet settings?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WalletSettings;
import React, { useState, useEffect } from 'react';
import { Typography, TextField, Box, Paper, List, ListItem, ListItemIcon, ListItemText, Stepper, Step, StepLabel, StepContent, Button } from '@mui/material';
import { UserData, WalletSettings } from '../types';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';

interface WalletSettingsStepProps {
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  onValidationChange: (isValid: boolean) => void;
}

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



const WalletSettingsStep: React.FC<WalletSettingsStepProps> = ({ setUserData, onValidationChange }) => {
  const [walletSettings, setWalletSettings] = useState<WalletSettings>({
    address: '',
    private_key: '',
    arbitrum_rpc: '',
    chain_id_base: 0,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof WalletSettings, string>>>({});

  const validationRules: Record<keyof WalletSettings, { regex: RegExp; errorMessage: string }> = {
    address: { 
      regex: /^0x[a-fA-F0-9]{40}$/, 
      errorMessage: 'Invalid Ethereum address format' 
    },
    private_key: { 
      regex: /^[a-fA-F0-9]{64}$/, 
      errorMessage: 'Invalid private key format' 
    },
    arbitrum_rpc: { 
      regex: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, 
      errorMessage: 'Invalid URL format' 
    },
    chain_id_base: { 
      regex: /^[1-9]\d*$/, 
      errorMessage: 'Chain ID must be a positive integer' 
    },
  };

  const validateField = (name: keyof WalletSettings, value: string): string => {
    if (!value) return 'This field is required';
    const rule = validationRules[name];
    return rule.regex.test(value) ? '' : rule.errorMessage;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newValue = name === 'chain_id_base' ? parseInt(value, 10) || 0 : value;
    
    setWalletSettings(prev => ({
      ...prev,
      [name]: newValue,
    }));

    const error = validateField(name as keyof WalletSettings, value);
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  };

  // Alchemy Setup
  const [activeStep, setActiveStep] = useState(0);
  // Helper Images
  const [rpcDialog, setRpcDialog] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    const isValid = Object.values(errors).every(error => !error) &&
                    Object.values(walletSettings).every(value => value !== '' && value !== 0);
    onValidationChange(isValid);

    setUserData(prevData => ({
      ...prevData,
      walletSettings,
    }));
  }, [walletSettings, errors, setUserData, onValidationChange]);

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
        <Typography variant="body2" sx={{ mt: 2 }}>
          The developers believe the private key field in <code>.env</code> is completely isolated and can only be changed by the user (last reviewed: <span style={{ color: 'red' }}>05/09/2024</span>).
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          After reviewing the open-source backend code, open your filesystem: 
          <Box component="span" sx={{ 
            fontFamily: 'monospace', 
            bgcolor: '#e0e0e0', 
            p: 0.5, 
            borderRadius: 1,
            mx: 1
          }}>
            C:\your-bot-folder\.env
          </Box> 
          and paste your private key in the <span style={{ color: 'blue' }}>PRIVATE_KEY</span> field.
        </Typography>
      </Paper>

      <TextField
        fullWidth
        margin="normal"
        name="address"
        label="Your New Wallet Address"
        value={walletSettings.address}
        onChange={handleChange}
        error={!!errors.address}
        helperText={errors.address}
      />

      <Paper elevation={3} sx={{ p: 3, my: 3, bgcolor: '#e3f2fd' }}>
        <Typography variant="h6" gutterBottom><strong>Setting up <a href={'https://alchemy.com'}>Alchemy</a> Arbitrum API Keys for Mainnet and Testnet</strong></Typography>
        <Stepper activeStep={activeStep} orientation="vertical">
          {AlchemySetupSteps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
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

      <TextField
        fullWidth
        margin="normal"
        name="arbitrum_rpc"
        label="Arbitrum RPC URL"
        value={walletSettings.arbitrum_rpc}
        onChange={handleChange}
        error={!!errors.arbitrum_rpc}
        helperText={errors.arbitrum_rpc}
      />
      <TextField
        fullWidth
        margin="normal"
        name="chain_id_base"
        label="Chain ID Base"
        type="number"
        value={walletSettings.chain_id_base || ''}
        onChange={handleChange}
        error={!!errors.chain_id_base}
        helperText={errors.chain_id_base}
      />
    </Box>
  );
};

export default WalletSettingsStep;




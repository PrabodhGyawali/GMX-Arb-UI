import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, InputAdornment } from '@mui/material';
import DeployCard from './DeployCard';
function DeploySection() {
  // Amount of HMX and SYN to deploy
  const [hmxAmount, setHmxAmount] = useState('');
  const [synAmount, setSynAmount] = useState('');
  // Error state for HMX and SYN amount
  const [hmxError, setHmxError] = useState(false);
  const [synError, setSynError] = useState(false);
  // Collateral balance for HMX and SYN
  const [hmxBalance, setHmxBalance] = useState('...');
  const [synBalance, setSynBalance] = useState('...');

  const validateAmount = (value: string, setError: React.Dispatch<React.SetStateAction<boolean>>) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 1) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleHmxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setHmxAmount(value);
    validateAmount(value, setHmxError);
  };

  const handleSynChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSynAmount(value);
    validateAmount(value, setSynError);
  };
  const handleDeployHMX = () => {
    // Log data for deploying HMX
    console.log('Deploying HMX:', hmxAmount);
  };

  const handleDeploySYN = () => {
    // Log data for deploying SYN
    console.log('Deploying SYN:', synAmount);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch HMX balance
        const response = await fetch('/api/settings/collateral/Synthetix');
        if (response.status === 200) {
          const data = await response.json();
          setSynBalance(data);
        } else {
          setSynBalance('Error');
        }
        // Fetch SYN balance
      } catch (error) {
        setSynBalance('Error');
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <Box sx={{
      height: '50vh', 
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Typography variant="h4" color="primary" sx={{ padding: '0em', textAlign: 'center' }}>Deploy Collateral</Typography>
      <Box sx={{
        flexGrow: 1,
        overflowY: 'auto',
        padding: '1em',
        '&::-webkit-scrollbar': {
          width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
          boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
          webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.1)',
          outline: '1px solid slategrey'
        }
      }}>
        <Box className="deploy" sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2em',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: '2em',
          backgroundColor: 'background.paper',
          borderRadius: '8px',
          minHeight: 'min-content',
          overflow: 'hidden',
        }}>
          <DeployCard 
            args={{amount: synAmount, tokenAddress: ''}} 
            handleAmountChange={handleSynChange} 
            handleDeploy={handleDeploySYN}
            handleError={synError} 
            exchange="SYN"
            exchangeLogo='public\svg\synthetix-snx-logo.svg'
            collateralBalance={synBalance} 
          />
          <DeployCard 
            args={{amount: synAmount, tokenAddress: ''}} 
            handleAmountChange={handleHmxChange} 
            handleDeploy={handleDeployHMX}
            handleError={hmxError} 
            exchange="HMX" 
            exchangeLogo='public\svg\bybit-logo.svg'
            collateralBalance={hmxBalance}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default DeploySection;
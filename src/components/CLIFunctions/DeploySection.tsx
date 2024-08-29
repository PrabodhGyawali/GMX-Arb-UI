import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import DeployCard from './DeployCard';
import { useSocket } from '../../Context/SocketContext';

function DeploySection() {
  const {socket} = useSocket();

  // Amount of Bybit and SYN to deploy
  const [byBitAmount, setByBitAmount] = useState('');
  const [synAmount, setSynAmount] = useState('');
  // Error state for Bybit and SYN amount
  const [byBitError, setByBitError] = useState(false);
  const [synError, setSynError] = useState(false);
  // Collateral balance for HMX and SYN
  const [byBitBalance, setByBitBalance] = useState('...');
  const [synBalance, setSynBalance] = useState('...');

  const validateAmount = (value: string, setError: React.Dispatch<React.SetStateAction<boolean>>) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 1) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleByBitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setByBitAmount(value);
    validateAmount(value, setByBitError);
  };

  const handleSynChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSynAmount(value);
    validateAmount(value, setSynError);
  };
  const handleDeployByBit = () => {
    // Log data for deploying HMX
    console.log('Deploying ByBit:', byBitAmount);
  };

  const handleDeploySYN = () => {
    // Log data for deploying SYN
    console.log('Deploying SYN:', synAmount);
  };

  const fetchData = async () => {
    try {
      // Fetch Synthetix balance
      const response = await fetch('/api/settings/collateral/Synthetix');
      if (response.status === 200) {
        const data = await response.json();
        setSynBalance(data);
      } else {
        setSynBalance('Error');
      }
    } catch (error) {
      setSynBalance('Error');
    }
    try {
      // Fetch ByBit balance
      const response = await fetch('/api/settings/collateral/ByBit');
      if (response.status === 200) {
        const data = await response.json();
        setByBitBalance(data);
      } else {
        setByBitBalance('Error');
      }
    } catch (error) {
      setSynBalance('Error');
    }
  };

  socket?.on('connect', () => {
    fetchData();
  });

  // useEffect(() => {
  //   // Fetch ByBit and SYN balance
  //   fetchData();
  // }, []);

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
            args={{ amount: synAmount, tokenAddress: '' }}
            handleAmountChange={handleSynChange}
            handleDeploy={handleDeploySYN}
            handleError={synError}
            exchange="SYN"
            exchangeLogo='public\svg\synthetix-snx-logo.svg'
            collateralBalance={synBalance}
          />
          <DeployCard
            args={{ amount: synAmount, tokenAddress: '' }}
            handleAmountChange={handleByBitChange}
            handleDeploy={handleDeployByBit}
            handleError={byBitError}
            exchange="Bybit"
            exchangeLogo='public\svg\bybit-logo.svg'
            collateralBalance={byBitBalance}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default DeploySection;
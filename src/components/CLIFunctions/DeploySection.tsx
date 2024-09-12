import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import DeployCard from './DeployCard';
import { useSocket } from '../../Context/SocketContext';

function DeploySection() {
  const {socket, backendUrl} = useSocket();

  // Amount of Bybit and SYN to deploy
  const [byBitAmount, setByBitAmount] = useState('');
  // Error state for Bybit and SYN amount
  const [byBitError, setByBitError] = useState(false);
  // Collateral balance for HMX and SYN
  const [byBitBalance, setByBitBalance] = useState('...');

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


  const handleDeployByBit = () => {
    // Log data for deploying HMX
    console.log('Deploying ByBit:', byBitAmount);
  };

  const fetchData = async () => {
    try {
      // Fetch ByBit balance
      const response = await fetch(`${backendUrl}/settings/collateral/ByBit`);
      if (response.status === 200) {
        const data = await response.json();
        setByBitBalance(data);
      } else {
        setByBitBalance('...');
      }
    } catch (error) {
      setByBitError(true);
    }
  };

  socket?.on('connect', () => {
    fetchData();
  });


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
            args={{ amount: byBitAmount, tokenAddress: '' }}
            handleAmountChange={handleByBitChange}
            handleDeploy={handleDeployByBit}
            handleError={byBitError}
            exchange="Bybit"
            exchangeLogo='svg\bybit-logo.svg'
            collateralBalance={byBitBalance}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default DeploySection;
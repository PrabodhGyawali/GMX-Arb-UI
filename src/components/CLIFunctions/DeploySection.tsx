import React, { useState } from 'react';
import { Box, Typography, Button, TextField, InputAdornment } from '@mui/material';

function DeploySection() {
  const [hmxAmount, setHmxAmount] = useState('');
  const [synAmount, setSynAmount] = useState('');
  const [hmxError, setHmxError] = useState(false);
  const [synError, setSynError] = useState(false);

  const sxButtons = {
    width: '120px',
    fontWeight: 'bold',
  };

  const sxInput = {
    width: '200px',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'secondary.main',
      },
      '&:hover fieldset': {
        borderColor: 'secondary.light',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'secondary.dark',
      },
    },
  };

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

  return (
    <Box sx={{
      height: '100%', // Take full height of parent
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
          boxShadow: 3,
          minHeight: 'min-content',
        }}>
          <Box className="deploy-HMX" sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1em',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Button sx={sxButtons} color="secondary" variant="contained">HMX</Button>
            <TextField
              sx={sxInput}
              type="number"
              placeholder="Enter Amount"
              variant="outlined"
              color="secondary"
              value={hmxAmount}
              onChange={handleHmxChange}
              error={hmxError}
              helperText={hmxError ? "Amount must be 1 or greater" : ""}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
          </Box>
          <Box className="deploy-synthetix" sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1em',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Button sx={sxButtons} color="secondary" variant="contained">SYN</Button>
            <TextField
              sx={sxInput}
              type="number"
              placeholder="Enter Amount"
              variant="outlined"
              color="secondary"
              value={synAmount}
              onChange={handleSynChange}
              error={synError}
              helperText={synError ? "Amount must be 1 or greater" : ""}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default DeploySection;
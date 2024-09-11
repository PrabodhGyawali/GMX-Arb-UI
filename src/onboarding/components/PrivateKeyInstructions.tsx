import React from 'react';
import { Box, Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import Carousel from '../../components/Carousel';

const PrivateKeyInstructions: React.FC = () => {
  const carouselItems = [
    {
      image: '/private-key-instruction-1.jpg',
      caption: 'Step 1: Open the .env file from file-explorer in C:\\funding-rate-arbitrage\\.env'
    },
    {
      image: '/private-key-instruction-2.jpg',
      caption: 'Step 2: Enter your private key in the PRIVATE_KEY field highlighted in the image'
    }
  ];

  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <WarningIcon color="warning" sx={{ mr: 1 }} />
        <Typography variant="body2" color="warning.main">
          Important: Add your private key to the file <Box component="span" sx={{ 
            fontFamily: 'monospace', 
            bgcolor: '#e0e0e0', 
            p: 0.5, 
            borderRadius: 1,
            mx: 1
          }}>
            C:\funding-rate-arbitrage\.env
          </Box> in the <Box component="span" sx={{ 
            fontFamily: 'monospace', 
            bgcolor: '#e0e0e0', 
            p: 0.5, 
            borderRadius: 1,
            mx: 1
          }}>
            PRIVATE_KEY
          </Box> field.
        </Typography>
      </Box>
      <Carousel items={carouselItems} />
    </Box>
  );
};

export default PrivateKeyInstructions;
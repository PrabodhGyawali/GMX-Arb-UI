import React from 'react';
import { Box } from '@mui/material';
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
      <Carousel items={carouselItems} />
    </Box>
  );
};

export default PrivateKeyInstructions;
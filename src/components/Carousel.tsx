import React, { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface CarouselItem {
  image: string;
  caption: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', maxWidth: 600, margin: 'auto' }}>
      <Paper elevation={3} sx={{ position: 'relative', overflow: 'hidden' }}>
        <Box
          component="img"
          src={items[currentIndex].image}
          alt={`Slide ${currentIndex + 1}`}
          sx={{
            width: '100%',
            height: 'auto',
            display: 'block',
            maxHeight: 400,
            objectFit: 'contain',
          }}
        />
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            textAlign: 'center',
          }}
        >
          {items[currentIndex].caption}
        </Typography>
      </Paper>
      <Button
        onClick={handlePrevious}
        sx={{
          position: 'absolute',
          left: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          minWidth: 'auto',
        }}
      >
        <ArrowBackIosNewIcon />
      </Button>
      <Button
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          minWidth: 'auto',
        }}
      >
        <ArrowForwardIosIcon />
      </Button>
    </Box>
  );
};

export default Carousel;
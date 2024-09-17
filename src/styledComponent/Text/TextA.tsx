// src/components/Text.tsx
import React from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme from '../customTheme';


const StyledTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const Text: React.FC<TypographyProps> = ({ children, variant = 'body1', color, ...props }) => {
  return (
    <StyledTypography variant={variant} color={color} {...props} theme={theme}>
      {children}
    </StyledTypography>
  );
};

export default Text;
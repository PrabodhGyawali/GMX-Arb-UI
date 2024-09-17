// src/components/Text.tsx
import React from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface TextProps extends TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body1' | 'body2';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
}

const StyledTypography = styled(Typography)<TextProps>(({ theme}) => ({
  color: color ? theme.palette[color].main : theme.palette.text.primary,
}));

const Text: React.FC<TextProps> = ({ children, variant = 'body1', color, ...props }) => {
  return (
    <StyledTypography variant={variant} color={color} {...props}>
      {children}
    </StyledTypography>
  );
};

export default Text;
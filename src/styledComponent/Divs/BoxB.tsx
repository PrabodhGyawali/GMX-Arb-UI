import React from 'react';
import { Box, BoxProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)({
  backgroundColor: "#0E1A37",
});

interface BoxAProps extends BoxProps {
  children: React.ReactNode;
}

const BoxA: React.FC<BoxAProps> = ({ children, ...props }) => {
  return (
    <StyledBox {...props}>
      {children}
    </StyledBox>
  );
};

export default BoxA;
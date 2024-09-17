import React from 'react';
import { Paper, PaperProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)({
  backgroundColor: "#1C274C",
});

interface PaperAProps extends PaperProps {
  children: React.ReactNode;
}

const PaperA: React.FC<PaperAProps> = ({ children, ...props }) => {
  return (
    <StyledPaper {...props}>
      {children}
    </StyledPaper>
  );
};

export default PaperA;
import React from 'react';
import { Paper, PaperProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)({
  padding: "2em",
  borderRadius: "8px",
  backgroundColor: "#1C274C",
  color: "#fff",
  boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
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
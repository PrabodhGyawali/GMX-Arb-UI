import React, {useState} from "react";
import { Typography, Box, Paper, Checkbox, Divider } from "@mui/material";
import { Link } from "react-router-dom";

interface TermsAndServicesProps {
  onValidationChange: (isValid: boolean) => void;
}

const TermsAndServices = () => (
  <Paper
    sx={{
      padding: "2em",
      borderRadius: "8px",
      backgroundColor: "#1C274C",
      color: "#fff",
      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
    }}
  >
    <Box sx={{ textAlign: "center", marginBottom: "2em", backgroundColor: "#1E2B50", padding: "1em", borderRadius: "8px" }}>
  <Typography variant="h5" sx={{ backgroundColor: "#1C274C", fontWeight: "bold", marginBottom: "0" }}>
    Legal Disclaimer - Please Read
  </Typography>
  <Typography variant="subtitle1" sx={{ backgroundColor: "#1C274C", color: "#aaa" }}>
    Last Modified: <strong style={{ backgroundColor: "transparent" }}>September 16, 2024</strong>
  </Typography>
</Box>

    <Divider sx={{ backgroundColor: "#444", marginBottom: "2em" }} />

    <Box sx={{ outline: '1px solid #808080', backgroundColor: "#1C274C", padding: "1em" }}>
      <Typography variant="h5" sx={{ backgroundColor: "#1C274C", fontWeight: "bold", marginBottom: "1em" }}>
        1. Financial Risk
      </Typography>
      <Typography variant="body1" sx={{ backgroundColor: "#1C274C", marginBottom: "0.75em", lineHeight: "1.6" }}>
        By using this website/trading software interface, I certify that I accept the terms and conditions laid out below.
      </Typography>

      <Typography variant="body1" sx={{ backgroundColor: "#1C274C", marginBottom: "0.75em", lineHeight: "1.6" }}>
        <strong style={{ backgroundColor: "transparent" }}>1.1</strong>: I understand that this is an open source financial tool, and the risks associated both with cryptocurrency and with interacting with open source software.
      </Typography>
      <Typography variant="body1" sx={{ backgroundColor: "#1C274C", marginBottom: "0.75em", lineHeight: "1.6" }}>
        <strong style={{ backgroundColor: "transparent" }}>1.2</strong>: I understand that by using trading strategies involving leverage the risk of loss of funds, either due to liquidation or to unsuccessful trades, is higher than spot trading; a fact accentuated by the inclusion of crypto assets as the underlying collateral and mark asset.
      </Typography>
      <Typography variant="body1" sx={{ backgroundColor: "#1C274C", marginBottom: "0.75em", lineHeight: "1.6" }}>
        <strong style={{ backgroundColor: "transparent" }}>1.3</strong>: I understand the risks related to the incursion of financial losses from the bot's algorithm, knowing that it is a newly built product with limited production test data.
      </Typography>
      <Typography variant="body1" sx={{ backgroundColor: "#1C274C", marginBottom: "0.75em", lineHeight: "1.6" }}>
        <strong style={{ backgroundColor: "transparent" }}>1.4</strong>: I understand the mechanisms by which leverage trading, specifically perpetual futures, functions.
      </Typography>
      <Typography variant="body1" sx={{ backgroundColor: "#1C274C", marginBottom: "0.75em", lineHeight: "1.6" }}>
        <strong style={{ backgroundColor: "transparent" }}>1.5</strong>: I understand that the bot runs on open-source code that can be freely downloaded, audited and verified on GitHub.
      </Typography>
      <Typography variant="body1" sx={{ backgroundColor: "#1C274C", marginBottom: "0.75em", lineHeight: "1.6" }}>
        <strong style={{ backgroundColor: "transparent" }}>1.6</strong>: I understand that by using this software, I am putting my assets under the control of the trading bot, where the program has (limited) access to the relevant private key.
      </Typography>

      <Divider sx={{ backgroundColor: "#444", margin: "2em 0" }} />

      <Typography variant="h5" sx={{ backgroundColor: "#1C274C", fontWeight: "bold", marginBottom: "1em" }}>
        2. Data Collection
      </Typography>
      <Typography variant="body1" sx={{ backgroundColor: "#1C274C", marginBottom: "0.75em", lineHeight: "1.6" }}>
        <strong style={{ backgroundColor: "transparent" }}>2.1</strong>: Trading volume will be monitored on wallets which use this software, so as to infer the total volume routed via the bot. No additional data is stored, nor will the data that is stored by used for any additional purpose.
      </Typography>
      <Typography variant="body1" sx={{ backgroundColor: "#1C274C", marginBottom: "0.75em", lineHeight: "1.6" }}>
        <strong style={{ backgroundColor: "transparent" }}>2.2</strong>: We ask for information from the front-end client in order to set up the bot which we do not store. Sensitive information such as API keys and secrets are collected via the frontend and are used to create a `.env` file that stores these values. The values are not used further, and I can verify this fact myself via reviewing the UI repository on Github
      </Typography>
      <Typography variant="body1" sx={{ backgroundColor: "#1C274C", marginBottom: "0.75em", lineHeight: "1.6" }}>
        <strong style={{ backgroundColor: "transparent" }}>2.3</strong>: When working with project devs to debug any errors that may occur, I understand that they will never ask for my private keys.
      </Typography>

      <Divider sx={{ backgroundColor: "#444", margin: "2em 0" }} />

      <Typography variant="h5" sx={{ backgroundColor: "#1C274C", fontWeight: "bold", marginBottom: "1em" }}>
        3. Security
      </Typography>
      <Typography variant="body1" sx={{ backgroundColor: "#1C274C", marginBottom: "0.75em", lineHeight: "1.6" }}>
        <strong style={{ backgroundColor: "transparent" }}>3.1.1</strong>: I should never, under any circumstances, give anyone my private keys - and I understand the risks of doing so.
      </Typography>
      <Typography variant="body1" sx={{ backgroundColor: "#1C274C", marginBottom: "0.75em", lineHeight: "1.6" }}>
        <strong style={{ backgroundColor: "transparent" }}>3.1.2</strong>: If I run the bot on my laptop or personal computer, I understand the importance of keeping it in a safe location to protect my private keys.
      </Typography>
      <Typography variant="body1" sx={{ backgroundColor: "#1C274C", marginBottom: "0.75em", lineHeight: "1.6" }}>
        <strong style={{ backgroundColor: "transparent" }}>3.1.3</strong>: I understand the importance of security updates on the codebase and reaching out to developers if I have concerns over a code update.
      </Typography>

      <Divider sx={{ backgroundColor: "#444", margin: "2em 0" }} />

      <Typography variant="h5" sx={{ backgroundColor: "#1C274C", fontWeight: "bold", marginBottom: "1em" }}>
        4. Front-end Interface
      </Typography>
      <Typography variant="body1" sx={{ backgroundColor: "#1C274C", marginBottom: "0.75em", lineHeight: "1.6" }}>
        <strong style={{ backgroundColor: "transparent" }}>4.1.1</strong>: I understand that the front-end interface is only used for setting up and interacting with the bot.
      </Typography>
      <Typography variant="body1" sx={{ backgroundColor: "#1C274C", marginBottom: "0.75em", lineHeight: "1.6" }}>
        <strong style={{ backgroundColor: "transparent" }}>4.1.2</strong>: I understand that the front-end interface requires the address and port of my locally hosted backend server.
      </Typography>

      <Box sx={{ backgroundColor: "#1C274C", textAlign: "center", marginTop: "2em" }}>
        <Typography variant="body2" sx={{ backgroundColor: "#1C274C", color: "#fff" }}>
          This repository is under active development and has not yet been ran extensively in production.
        </Typography>
      </Box>
    </Box>
  </Paper>
);

export const WelcomeStep: React.FC<TermsAndServicesProps> = ({ onValidationChange }) => {
  const [isAccepted, setIsAccepted] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setIsAccepted(newValue);
    onValidationChange(newValue);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#0E1A37", // Dark background for the entire page
        padding: "2em",
        minHeight: "100vh", // Ensure the background fills the entire viewport
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#1C274C", // Box background color
          padding: "2em",
          borderRadius: "8px",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
          color: "#fff", // White text for contrast
          width: "100%",
          maxWidth: "800px", // Restrict width for readability
        }}
      >
        <Typography variant="h4" sx={{ outline: '1px solid #808080', backgroundColor: "#1E2B50", padding: "1em", marginBottom: "1em", fontWeight: "bold" }}>
          Welcome to the GMX Funding Rate Arbitrage Interface
        </Typography>
        
        <Typography variant="body1" sx={{ backgroundColor: "#1C274C", padding: "1em", borderRadius: "8px", lineHeight: "1.6", marginBottom: "2em" }}>
          Before you begin, please make sure that you have read the terms and services. 
          If any part of the terms and services is unclear or presents cause for concern, please{" "}
          <Typography
            component={Link}
            to="/contact"
            sx={{ backgroundColor: "#1C274C", padding: "0", color: "#5ea0ee", textDecoration: "underline", display: "inline" }}
          >
            contact
          </Typography>{" "}
          us directly.
        </Typography>

        {/* Including Terms and Services Component */}
        <TermsAndServices />
  
        <Box
          sx={{
            backgroundColor: "#1C274C",
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: "2em",
          }}
        >
          <Checkbox
            checked={isAccepted}
            onChange={handleCheckboxChange}
            sx={{
              '&.Mui-checked': {
                color: "#00ff00", // Customize checked color
              },
              color: "#FFFFFF", // Customize unchecked color
            }}
          />
          <Typography sx={{ backgroundColor: "#1C274C", paddingLeft: "0.5em", fontSize: "1rem", color: "#fff" }}>
            I have read and understood the terms and conditions
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
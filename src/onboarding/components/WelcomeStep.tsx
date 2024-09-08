import React, {useState} from "react";
import { Typography, Box, Paper, Checkbox } from "@mui/material";
import { Link } from "react-router-dom";

interface TermsAndServicesProps {
  onValidationChange: (isValid: boolean) => void;
}

const TermsAndServices = () => (
  <Paper sx={{padding: '1em', overflow: "hidden"}}>
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0.25em'}}>
      <Typography variant="h4">
        Legal Disclaimer Please Read
      </Typography>
      <Typography>Last Modified: <strong>September 4, 2024</strong></Typography>
    </Box>
    <Box>
      <Typography>
        By using this website/trading software interface, you certify that you accept the terms and conditions laid out below.
      </Typography>
      <Typography variant="h5"><strong>1. I understand that this is a financial service, and the risks associated with cryptocurrency.</strong></Typography>
      <Typography variant="h6">1.2: I understand that I may lose all my money investing in cryptocurrency leverage trading.</Typography>
      <Typography variant="h6">1.3: I understand the risks related to incurring financial losses from the bot's algorithm, knowing that it is a newly built product with limited production test data.</Typography>
      <Typography variant="h6">1.4: I understand how leverage trading works.</Typography>
      <Typography variant="h6">1.5: I understand that the bot runs on open source code that can be freely downloaded and verified on github.</Typography>
      <Typography variant="h6">1.6: I understand that I would be putting my assets into the hands of the trading bot, where the program has (limited) access to the selected private key.</Typography>
      <Typography variant="h6">1.7: I understand that the trading program is a community built, open source project, and that the integrated exchanges (GMX, Binance, etc) hold no liability for any potential damages that may be incurred, be they financial or otherwise.</Typography>
      <Typography variant="h6">1.8: I understand that the application requires that I create a new wallet, separate from my other cryptocurrency wallets, as the program runs 24/7 and requires trades to be placed immediately without waiting for a traditional confirmation via a browser extension.</Typography>
      <Typography variant="h5"><strong>2. Data Collection</strong></Typography>
      <Typography variant="h6">2.1: We monitor total trading volume associated with the wallets which use this software, so as to infer the total volume routed via the bot.</Typography>
      <Typography variant="h6">2.2: We ask for information from the front-end client in order to set up the bot which we do not store. Sensitive information such as private keys, API keys and secrets are collected via the frontend and are used to create a .env file which stores these values. None of this data is kept in the frontend nor exported elsewhere after the .env file is created. We encourage you to verify this for yourself by checking the codebase.</Typography>
      <Typography variant="h6">2.3: When working with project devs to debug any errors that may occur, I understand that they will never ask for my private keys.</Typography>
      <Typography variant="h5"><strong>3. Security</ strong></Typography>
      <Typography variant="h6">3.1.1: You should never, under any circumstances, give anyone your private keys - and I understand the risks of doing so.</Typography>
      <Typography variant="h6">3.1.2: If I run the bot 24/7 on my laptop or personal computer, I understand the importance of keeping it in a safe location to protect my private keys.</Typography>
      <Typography variant="h6">3.1.3: I understand the importance of security updates on the codebase and reaching out to developers in case I have concerns over a code update.</Typography>
      <Typography variant="h5"><strong>4. Front-end Interface</strong></Typography>
      <Typography variant="h6">4.1.1: I understand that the front-end interface is only used for setting up the and interacting with the bot.</Typography>
      <Typography variant="h6">4.1.2: I understand that the front-end interface requires the address and port of your locally hosted backend server.</Typography>
      <Typography variant="h4" sx={{textAlign:'center', width:'100%'}}>Legal Disclaimer - Please Read</Typography>
      <Typography variant="h6">
      As mentioned above, this repository is under active development and has not yet been ran extensively in production.
      </Typography>
    </Box>
  </Paper>
);

export const WelcomeStep: React.FC<TermsAndServicesProps> = ({onValidationChange}) => {
  const [isAccepted, setIsAccepted] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setIsAccepted(newValue);
    onValidationChange(newValue);
  };

  return (
    <Box>
      <Typography> 
        Before we begin, please make sure that you have read the terms and services.
      </Typography>
      <Typography>
        If you do not understand a part of the terms and service or disagree with any part of it, please <Link to="/contact">contact</Link> us.
      </Typography>
      <TermsAndServices />
      <Box sx={{width: '100%', display:'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
        <Checkbox checked={isAccepted} 
                  onChange={handleCheckboxChange} />
        <Typography sx={{paddingLeft:'0.5em'}}> I have read and understood terms and conditions</Typography>
      </Box>
    </Box>
  );
}


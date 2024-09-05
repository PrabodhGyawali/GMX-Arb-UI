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
        Terms and Services
      </Typography>
      <Typography>Last Modified: <strong>September 4, 2024</strong></Typography>
    </Box>
    <Box>
      <Typography>
        Please do not use this site, interface or trading software if you disagree with any of these terms and services below.
      </Typography>
      <Typography variant="h5"><strong>1. Understanding that this is a financial service and the risks associated with cryptocurrency.</strong></Typography>
      <Typography variant="h6">1.2: You understand that you may lose all your money investing in cryptocurrency leverage trading.</Typography>
      <Typography variant="h6">1.3: You understand the risk of incurring losses from bot's algorithm of a newly built product with limited test data.</Typography>
      <Typography variant="h6">1.4: You understand how leverage trading works.</Typography>
      <Typography variant="h6">1.5: You understand that the bot runs on opensource code that can be downloaded on github.</Typography>
      <Typography variant="h6">1.6: You understand that you are putting your assets in the hands on the trading bot.</Typography>
      <Typography variant="h6">1.7: You understand that the trading bot is not associated with any exchanges: GMX, Binance and ByBit.</Typography>
      <Typography variant="h6">1.8: You understand the terms and services of the trading bot clients mentioned in 1.1.5.</Typography>
      <Typography variant="h6">1.9: You understand that the application will require you to create a new wallet as the Bot runs 24/7 and requires trades to be placed and opened.</Typography><br />
      <Typography variant="h5"><strong>2. Data Collection</strong></Typography>
      <Typography variant="h6">2.1: We collect the trading volume associated with your wallet address to infer the total volume through our bot.</Typography>
      <Typography variant="h6">2.1: We ask for information from the front-end client in order to set up the bot which we do not store.</Typography>
      <Typography variant="h6">2.1: When working with our devs to fix errors when trading we will never ask for your private keys.</Typography>
      <Typography variant="h5"><strong>3. Security</ strong></Typography>
      <Typography variant="h6">3.1.1: You should never give anyone your private keys and understand the risks of doing so.</Typography>
      <Typography variant="h6">3.1.2: If you run the bot 24/7 in your laptop you understand the importance of keeping it in a safe location to protect your private keys.</Typography>
      <Typography variant="h6">3.1.3: You understand the importance of security updates on the codebase and reaching out to developers in case of a new architecture.</Typography>
      <Typography variant="h5"><strong>4. Front-end Interface</strong></Typography>
      <Typography variant="h6">4.1.1: You understand that the front-end interface is only for setting up the bot and not for monitoring the bot activity.</Typography>
      <Typography variant="h6">4.1.2: You understand that the front-end interface requires the address and port of your locally hosted backend server.</Typography>
      <Typography variant="h4" sx={{textAlign:'center', width:'100%'}}>Legal Disclaimer Please Read</Typography>
      <Typography variant="h6">
        As mentioned above, this repository is under active development and has not yet been ran extensively in production. 
        By cloning or forking the code and running it locally, you understand that you are running in-development code, and take on all responsibility 
        for any loss of funds that are incurred via user error, as-of-yet-undiscovered bugs, or any other concievable reason. You should be comfortable running, 
        interacting with and debugging the bot on testnet before considering any runs with real capital. This project is for educational purposes only. 
        Any interested party should not construe any information or other material found in this repository as legal, tax, investment, financial, or other advice. 
        Nothing contained here constitutes a solicitation, recommendation, endorsement, or offer by the repository creator, the Synthetix Protocol, or any third party service 
        provider to buy or sell any securities or other financial instruments in the US, nor in any other jurisdiction in which such solicitation or offer would be unlawful 
        under the securities laws of said jurisdiction. Under no circumstances will the repository creator or the Synthetix Protocol be held responsible or liable in any way 
        for any claims, damages, losses, expenses, costs, or liabilities whatsoever, including, without limitation, any direct or indirect damages for loss of profits.
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
        <Typography sx={{paddingLeft:'0.5em'}}> I have read terms and conditions</Typography>
      </Box>
    </Box>
  );
}


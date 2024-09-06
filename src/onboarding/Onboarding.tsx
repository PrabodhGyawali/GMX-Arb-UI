import { useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography } from '@mui/material';
import InstallationSteps from './components/InstallationSteps';
import WalletSettingsStep from './components/WalletSettingsStep';
import ExchangeSettingsStep from './components/ExchangeSettingsStep';
import BotSettingsStep from './components/BotSettingsStep';
import {WelcomeStep} from './components/WelcomeStep';
import { useSocket } from '../Context/SocketContext';
import { UserData } from 'onboarding/types.tsx'

interface OnboardingProps {
  onComplete: () => void;
}

function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState<UserData>({
    walletSettings: {
      address: '',
      network: null,
      arbitrum_rpc: '',
    },
    exchangeSettings: {
      bybit: { apiKey: '', apiSecret: '', enabled: false },
      binance: { apiKey: '', apiSecret: '', enabled: false },
    },
    botSettings: {
      max_allowable_percentage_away_from_liquidation_price: 15,
      trade_leverage: 5,
      percentage_capital_per_trade: 10,
      default_trade_duration_hours: 12,
      default_trade_size_usd: 1000,
    },
  });
  const {connected, backendUrl} = useSocket();
    const [isWelcomeStepValid, setIsWelcomeStepValid] = useState(false);
    const [isWalletSettingsValid, setIsWalletSettingsValid] = useState(false);
    const [isExchangeSettingsValid, setIsExchangeSettingsValid] = useState(false);

  const steps = [
    { title: 'Welcome to GMX Funding Rate Arbitrage', 
      component: <WelcomeStep onValidationChange={setIsWelcomeStepValid} />, 
      valid: isWelcomeStepValid },
    { title: 'Download the Bot from Github',
      component: <InstallationSteps />,
      valid: connected
    },
    { title: 'Wallet Settings', 
      component: <WalletSettingsStep setUserData={setUserData} onValidationChange={setIsWalletSettingsValid} />, 
      valid: isWalletSettingsValid },
    { title: 'Exchange Settings', 
      component: <ExchangeSettingsStep setUserData={setUserData} onValidationChange={setIsExchangeSettingsValid} />, 
      valid: isExchangeSettingsValid },
    { title: 'Bot Settings', 
      component: <BotSettingsStep setUserData={setUserData} />, 
      valid: true 
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      finishOnboarding();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const finishOnboarding = async () => {
    try {
      await axios.post(`${backendUrl}/settings/complete-onboarding`, userData);
      onComplete();
    } catch (error) {
      console.error('Error completing onboarding:', error);
    } // TODO: Inform the user of the error
  };

  return (
    <Box className="onboarding" sx={{ maxWidth: 600, margin: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>{steps[step].title}</Typography>
      {steps[step].component}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={handleBack} disabled={step === 0}>
          Back
        </Button>
        <Button onClick={handleNext} variant="contained" disabled={!steps[step].valid}>
          {step === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
}

export default Onboarding;

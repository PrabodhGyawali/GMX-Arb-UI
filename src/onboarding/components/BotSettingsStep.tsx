import React, { useState } from 'react';
import {
  Box,
  Slider,
  Typography,
  Paper,
  Grid,
} from '@mui/material';
import { BotConfig } from 'onboarding/types';

interface BotSettingsStepProps {
  setUserData: React.Dispatch<React.SetStateAction<any>>;
}

const BotSettingsStep: React.FC<BotSettingsStepProps> = ({ setUserData }) => {
  const initialSettings: BotConfig = {
    max_allowable_percentage_away_from_liquidation_price: 15,
    trade_leverage: 5,
    percentage_capital_per_trade: 10,
    default_trade_duration_hours: 12,
    default_trade_size_usd: 1000,
  };

  const [botConfig, setBotConfig] = useState<BotConfig>(initialSettings);

  const handleSettingChange = (setting: keyof BotConfig) => (
    event: Event,
    newValue: number | number[]
  ) => {
    const updatedSettings = {
      ...botConfig,
      [setting]: newValue as number
    };
    setBotConfig(updatedSettings);
    setUserData(prevData => ({
      ...prevData,
      botSettings: updatedSettings
    }));
  };

  const settingConfigs: {
    key: keyof BotConfig;
    label: string;
    min: number;
    max: number;
    step: number;
  }[] = [
    {
      key: 'max_allowable_percentage_away_from_liquidation_price',
      label: 'Max Allowable Percentage from Liquidation Price',
      min: 5,
      max: 30,
      step: 1,
    },
    {
      key: 'trade_leverage',
      label: 'Trade Leverage',
      min: 1,
      max: 10,
      step: 1,
    },
    {
      key: 'percentage_capital_per_trade',
      label: 'Percentage Capital per Trade',
      min: 1,
      max: 100,
      step: 1,
    },
    {
      key: 'default_trade_duration_hours',
      label: 'Default Trade Duration (Hours)',
      min: 6,
      max: 24,
      step: 1,
    },
    {
      key: 'default_trade_size_usd',
      label: 'Default Trade Size (USD)',
      min: 50,
      max: 1_000_000,
      step: 10,
    },
  ];

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Bot Settings
      </Typography>
      <Grid container spacing={3}>
        {settingConfigs.map((config) => (
          <Grid item xs={12} key={config.key}>
            <Typography gutterBottom>
              {config.label}: {botConfig[config.key]}
            </Typography>
            <Box sx={{ px: 2 }}>
              <Slider
                value={botConfig[config.key]}
                onChange={handleSettingChange(config.key)}
                aria-labelledby={`${config.key}-slider`}
                valueLabelDisplay="auto"
                min={config.min}
                max={config.max}
                step={config.step}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default BotSettingsStep;
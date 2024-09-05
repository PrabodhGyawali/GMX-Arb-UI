import React, { useState, useEffect } from 'react';
import { Typography, TextField, Box, Checkbox, FormControlLabel, Button } from '@mui/material';
import { UserData, ExchangeSettings } from './types';

interface ExchangeSettingsStepProps {
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  onValidationChange: (isValid: boolean) => void;
}

const ExchangeSettingsStep: React.FC<ExchangeSettingsStepProps> = ({ setUserData, onValidationChange }) => {
  const [exchangeSettings, setExchangeSettings] = useState<ExchangeSettings>({
    bybit: { apiKey: '', apiSecret: '', enabled: false },
    binance: { apiKey: '', apiSecret: '', enabled: false },
  });

  const [errors, setErrors] = useState({
    bybit: { apiKey: '', apiSecret: '' },
    binance: { apiKey: '', apiSecret: '' },
  });

  const apiKeyRegex = /^[A-Za-z0-9]{18,64}$/;
  const apiSecretRegex = /^[A-Za-z0-9]{32,64}$/;

  const validateField = (exchange: 'bybit' | 'binance', field: 'apiKey' | 'apiSecret', value: string) => {
    const regex = field === 'apiKey' ? apiKeyRegex : apiSecretRegex;
    if (!value && exchangeSettings[exchange].enabled) {
      return `${field === 'apiKey' ? 'API Key' : 'API Secret'} is required`;
    }
    if (value && !regex.test(value)) {
      return `Invalid ${field === 'apiKey' ? 'API Key' : 'API Secret'} format`;
    }
    return '';
  };

  const handleChange = (exchange: 'bybit' | 'binance', field: 'apiKey' | 'apiSecret' | 'enabled') => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = field === 'enabled' ? event.target.checked : event.target.value;
    setExchangeSettings(prevSettings => ({
      ...prevSettings,
      [exchange]: {
        ...prevSettings[exchange],
        [field]: value,
      },
    }));

    if (field !== 'enabled') {
      setErrors(prevErrors => ({
        ...prevErrors,
        [exchange]: {
          ...prevErrors[exchange],
          [field]: validateField(exchange, field, value as string),
        },
      }));
    }
  };

  useEffect(() => {
    const isValid =
      (exchangeSettings.bybit.enabled || exchangeSettings.binance.enabled) &&
      Object.values(errors.bybit).every(error => !error) &&
      Object.values(errors.binance).every(error => !error);

    onValidationChange(isValid);

    setUserData(prevData => ({
      ...prevData,
      exchangeSettings,
    }));
  }, [exchangeSettings, errors, setUserData, onValidationChange]);

  return (
    <Box>
      <Typography variant='h6' gutterBottom>Exchange Settings</Typography>
      
      {/* ByBit Client */}
      <Box mb={3}>
        <FormControlLabel
          control={
            <Checkbox
              checked={exchangeSettings.bybit.enabled}
              onChange={handleChange('bybit', 'enabled')}
            />
          }
          label="Enable ByBit Client"
        />
        {exchangeSettings.bybit.enabled && (
          <>
            <TextField
              fullWidth
              margin="normal"
              name="apiKeyByBit"
              label="ByBit API Key"
              value={exchangeSettings.bybit.apiKey}
              onChange={handleChange('bybit', 'apiKey')}
              error={!!errors.bybit.apiKey}
              helperText={errors.bybit.apiKey}
            />
            <TextField
              fullWidth
              margin="normal"
              name="apiSecretByBit"
              label="ByBit API Secret"
              type="password"
              value={exchangeSettings.bybit.apiSecret}
              onChange={handleChange('bybit', 'apiSecret')}
              error={!!errors.bybit.apiSecret}
              helperText={errors.bybit.apiSecret}
            />
          </>
        )}
      </Box>

      {/* Binance Client */}
      <Box mb={3}>
        <FormControlLabel
          control={
            <Checkbox
              checked={exchangeSettings.binance.enabled}
              onChange={handleChange('binance', 'enabled')}
            />
          }
          label="Enable Binance Client"
        />
        {exchangeSettings.binance.enabled && (
          <>
            <TextField
              fullWidth
              margin="normal"
              name="apiKeyBinance"
              label="Binance API Key"
              value={exchangeSettings.binance.apiKey}
              onChange={handleChange('binance', 'apiKey')}
              error={!!errors.binance.apiKey}
              helperText={errors.binance.apiKey}
            />
            <TextField
              fullWidth
              margin="normal"
              name="apiSecretBinance"
              label="Binance API Secret"
              type="password"
              value={exchangeSettings.binance.apiSecret}
              onChange={handleChange('binance', 'apiSecret')}
              error={!!errors.binance.apiSecret}
              helperText={errors.binance.apiSecret}
            />
          </>
        )}
      </Box>

      {!exchangeSettings.bybit.enabled && !exchangeSettings.binance.enabled && (
        <Typography color="error">Please enable at least one exchange client.</Typography>
      )}
    </Box>
  );
};

export default ExchangeSettingsStep;
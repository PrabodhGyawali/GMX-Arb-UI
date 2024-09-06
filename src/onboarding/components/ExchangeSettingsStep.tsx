import React, { useState, useEffect } from 'react';
import { Typography, TextField, Box, Checkbox, FormControlLabel, Paper, Grid, Divider, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { UserData, ExchangeSettings } from '../types';

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
    } else if (field === 'enabled' && !value) {
      // Clear errors when disabling an exchange
      setErrors(prevErrors => ({
        ...prevErrors,
        [exchange]: { apiKey: '', apiSecret: '' },
      }));
    }
  };

  useEffect(() => {
    const isValid: boolean =
    (exchangeSettings.bybit.enabled || exchangeSettings.binance.enabled) &&
    (!exchangeSettings.bybit.enabled || (exchangeSettings.bybit.apiKey === '' && exchangeSettings.bybit.apiSecret === '')) &&
    (!exchangeSettings.binance.enabled || (exchangeSettings.binance.apiKey === '' && exchangeSettings.binance.apiSecret === '')) &&
    Object.values(errors.bybit).every(error => error === '') &&
    Object.values(errors.binance).every(error => error === '');

    onValidationChange(isValid);

    setUserData(prevData => ({
      ...prevData,
      exchangeSettings,
    }));
  }, [exchangeSettings, errors, setUserData, onValidationChange]);

  const renderExchangeFields = (exchange: 'bybit' | 'binance') => (
    <Box mb={3}>
      <FormControlLabel
        control={
          <Checkbox
            checked={exchangeSettings[exchange].enabled}
            onChange={handleChange(exchange, 'enabled')}
          />
        }
        label={`Enable ${exchange.charAt(0).toUpperCase() + exchange.slice(1)} Client`}
      />
      {exchangeSettings[exchange].enabled && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              margin="normal"
              name={`apiKey${exchange}`}
              label={`${exchange.charAt(0).toUpperCase() + exchange.slice(1)} API Key`}
              value={exchangeSettings[exchange].apiKey}
              onChange={handleChange(exchange, 'apiKey')}
              error={!!errors[exchange].apiKey}
              helperText={errors[exchange].apiKey}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              margin="normal"
              name={`apiSecret${exchange}`}
              label={`${exchange.charAt(0).toUpperCase() + exchange.slice(1)} API Secret`}
              type="password"
              value={exchangeSettings[exchange].apiSecret}
              onChange={handleChange(exchange, 'apiSecret')}
              error={!!errors[exchange].apiSecret}
              helperText={errors[exchange].apiSecret}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );

  return (
    <Paper elevation={3} sx={{ p: 3, my: 3 }}>
      <Typography variant='h6' gutterBottom>
        Exchange Settings
        <Tooltip title="Enable and configure API keys for the exchanges you want to use.">
          <IconButton size="small" sx={{ ml: 1 }}>
            <InfoOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Typography>
      <Divider sx={{ my: 2 }} />
      
      {renderExchangeFields('bybit')}
      {renderExchangeFields('binance')}

      {!exchangeSettings.bybit.enabled && !exchangeSettings.binance.enabled && (
        <Typography color="error" sx={{ mt: 2 }}>Please enable at least one exchange client.</Typography>
      )}
    </Paper>
  );
};

export default ExchangeSettingsStep;
import React, { useState, useEffect } from 'react';
import ExchangeSettings from './ExchangeSettings';
import { ConfigFile, BotConfig } from './ISettings';
import SettingsComponent from './SettingsComponent';
import EnvSettings from './EnvSettings';
import { Button } from '@mui/material';

const BotSettings: React.FC = () => {
  const [config, setConfig] = useState<ConfigFile | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null);
  const [save, setSave] = useState<boolean>(true);
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/settings/get");
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data: ConfigFile = await response.json();
        setConfig(data);
        console.log(data);
        setLoading(false);
      } catch (e) {
        console.error("Error: ", e);
        setError(e instanceof Error ? e.message : 'An unknown error occurred');
        setLoading(false);
      }
    }

    fetchSettings();
  }, [])

  if (loading) {
    return <div className='loading'>Loading settings...</div>
  }

  if (error) {
    return <div className='error'>Error: {error}</div>
  }

  if (!config) {
    return <div>No settings available</div>
  }

  const handleSettingsChange = (newSettings: BotConfig) => {
    if (config) {
      setConfig({...config, settings: newSettings});
      setSave(false);
    }
  }

  const checkExchangeAndTokenLength = (config: ConfigFile, message: String) => {
    if (config.target_tokens.length === 0 || config.target_exchanges.length < 2) {
      // TODO: Add error message of at least 1 token
      console.log(message);
      setSave(true);
    } else { setSave(false)}
  }

  const handleExchangeChange = (exchangeName: string, checked: boolean) => {
    setConfig(prevConfig => {
      if (!prevConfig) return null; // If config is null, we can't update it
      const newConfig = {
        ...prevConfig,
        target_exchanges: prevConfig.target_exchanges.map(exchange => 
          exchange.exchange === exchangeName
            ? { ...exchange, is_target: checked }
            : exchange
        )
      };

      checkExchangeAndTokenLength(newConfig, "At least 2 exchanges required!");

      return newConfig;
    });
  }; // TODO: Ensure at least 2 exchanges are chosen

  const handleTokenChange = (exchangeName: string, checked: boolean) => {
    setConfig(prevConfig => {
      if (!prevConfig) return null;

      const newConfig = {
        ...prevConfig,
        target_exchanges: prevConfig.target_exchanges.map(exchange => 
          exchange.exchange === exchangeName ? {...exchange, is_target: checked} : exchange
        )
      }
      checkExchangeAndTokenLength(newConfig, "At least 1 token required!");

      return newConfig;
    })
  } // TODO: Ensure at least 1 token in chosen
  
  // Safely configuring the config object
  return (
    <div className='botSettings'>
      <form>
        <SettingsComponent
          initialSettings={config.settings}
          onSettingsChange={handleSettingsChange}
        />
        <ExchangeSettings 
          target_exchanges={config.target_exchanges} 
          target_tokens={config.target_tokens}
          onExchangeChange={handleExchangeChange}
          onTokenChange={handleTokenChange}/>
        <EnvSettings />
      </form>
      <Button variant="contained"
              size="large" 
              disabled={save}
      >Save</Button>
    </div>
  );
};

export default BotSettings;
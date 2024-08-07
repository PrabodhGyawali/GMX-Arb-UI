import React, { useState, useEffect } from 'react';
import ExchangeSettings from './ExchangeSettings';
import { ConfigFile, BotConfig } from './ISettings';


const BotSettings: React.FC = () => {
  const [config, setConfig] = useState<ConfigFile | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/settings");
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data: ConfigFile = await response.json();
        setConfig(data);
        setLoading(false);
      } catch (e) {
        console.error("Error: ", e);
        setError(e instanceof Error ? e.message : 'An unknown error occurred');
        setLoading(false);
      }
    }
  }, [])
  

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   const newSettings = { ...settings, [name]: Number(value) };
  //   setSettings(newSettings);
  //   validateSettings(newSettings);
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (validateSettings(settings)) {
  //     console.log('Settings are valid:', settings);
  //     // Here you can send the settings to your backend or perform any other action
  //   } else {
  //     console.log('Settings are invalid');
  //   }
  // };

  return (
    <div className='botSettings'>
      <h2>Trading Bot Settings</h2>
      
    </div>
  );
};

export default BotSettings;
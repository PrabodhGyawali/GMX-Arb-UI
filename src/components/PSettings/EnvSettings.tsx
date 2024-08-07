import React, { useState } from 'react';
import { EnvConfig } from './ISettings';

const EnvSettings: React.FC = () => {

//   const [errors, setErrors] = useState<Partial<Record<keyof EnvSettings, string>>>({});

//   const validationRules: Record<keyof EnvSettings, RegExp> = {
//     BASE_PROVIDER_RPC: /^https?:\/\/.+$/,
//     ARBITRUM_PROVIDER_RPC: /^https?:\/\/.+$/,
//     CHAIN_ID_BASE: /^\d+$/,
//     ADDRESS: /^0x[a-fA-F0-9]{40}$/,
//     PRIVATE_KEY: /^[a-fA-F0-9]{64}$/,
//     BINANCE_API_KEY: /^[A-Za-z0-9]{64}$/,
//     BINANCE_API_SECRET: /^[A-Za-z0-9]{64}$/,
//     BYBIT_API_KEY: /^[A-Za-z0-9]{18}$/,
//     BYBIT_API_SECRET: /^[A-Za-z0-9]{36}$/,
//   };

//   const validateSetting = (name: keyof EnvSettings, value: string): boolean => {
//     const isValid = validationRules[name].test(value);
//     setErrors(prev => ({
//       ...prev,
//       [name]: isValid ? '' : `Invalid ${name.replace(/_/g, ' ').toLowerCase()}`,
//     }));
//     return isValid;
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setSettings(prev => ({ ...prev, [name]: value }));
//     validateSetting(name as keyof EnvSettings, value);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     let isValid = true;
//     Object.entries(settings).forEach(([key, value]) => {
//       if (!validateSetting(key as keyof EnvSettings, value)) {
//         isValid = false;
//       }
//     });

//     if (isValid) {
//       console.log('Settings are valid:', settings);
//       // Here you can send the settings to your backend or perform any other action
//     } else {
//       console.log('Settings are invalid');
//     }
//   };

  return (
    <div className="envSettings">
      {/* <h2>Environment Settings</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(settings).map(([key, value]) => (
          <div key={key}>
            <label htmlFor={key}>{key.replace(/_/g, ' ')}:</label>
            <input
              type={key.includes('KEY') || key.includes('SECRET') ? 'password' : 'text'}
              id={key}
              name={key}
              value={value}
              onChange={handleInputChange}
            />
            {errors[key as keyof EnvSettings] && <span style={{ color: 'red' }}>{errors[key as keyof EnvSettings]}</span>}
          </div>
        ))}
        <button type="submit">Save Settings</button>
      </form> */}
    </div>
  );
};

export default EnvSettings;
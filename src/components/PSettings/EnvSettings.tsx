import React, { useState } from 'react';
import { ChainSettings } from './ISettings';

interface ExchangeSettingsProps extends ChainSettings{
    onChainSettingsChange: (newSettings: ChainSettings) => void;
}

const EnvSettings: React.FC = () => {

  return (
    <div className="envSettings">
      
    </div>
  );
};

export default EnvSettings;
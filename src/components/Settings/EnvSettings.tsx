import React, { useState } from 'react';
import { ChainSettings } from './ISettings';
import { Paper, Typography, FormControlLabel } from '@mui/material';

interface ExchangeSettingsProps extends ChainSettings{
    initialSettings: ChainSettings;
    onChainSettingsChange: (newSettings: ChainSettings) => void;
}

const EnvSettings: React.FC<ExchangeSettingsProps> = ({
  initialSettings,
  onChainSettingsChange
}) => {

  return (
    <div className="envSettings">
      <Paper sx={{padding:"0.5em", marginBottom:"0.5em"}}>
        <Typography variant='h6'>Environment Settings</Typography>
        {/* <FormControlLabel key={"address"} /> */}
      </Paper>
    </div>
  );
};

export default EnvSettings;
import { Exchange, Token } from "./ISettings"
import {
    Paper,
    Typography,
    Grid,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Box
  } from '@mui/material';

interface ExchangeSettingsProps {
    target_exchanges: Exchange[];
    target_tokens: Token[];
    onExchangeChange: (exchange: string, isChecked: boolean) => void;
    onTokenChange: (token: string, isChecked: boolean) => void;
}

function ExchangeSettings({
    target_exchanges, 
    target_tokens,
    onExchangeChange,
    onTokenChange
}: ExchangeSettingsProps) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Target Exchanges
            </Typography>
            <FormGroup>
              {target_exchanges.map((exchange) => (
                <FormControlLabel
                  key={exchange.exchange}
                  control={
                    <Checkbox
                      checked={exchange.is_target}
                      onChange={(e) => onExchangeChange(exchange.exchange, e.target.checked)}
                    />
                  }
                  label={exchange.exchange}
                />
              ))}
            </FormGroup>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6">
              Target Tokens
            </Typography>
            <Box sx={{ maxHeight: 300, overflowY: 'auto', paddingBlockStart:"0 0 0 0.5em" }}>
              <FormGroup sx={{flexDirection:"row", paddingLeft:"0.5em"}}>
                {target_tokens.map((token) => (
                  <FormControlLabel sx={{width:"5em"}}
                    key={token.token}
                    control={
                      <Checkbox
                        checked={token.is_target}
                        onChange={(e) => onTokenChange(token.token, e.target.checked)}
                      />
                    }
                    label={token.token}
                  />
                ))}
              </FormGroup>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    )
}

export default ExchangeSettings
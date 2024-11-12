import React from 'react';
import {
  Card,
  Typography,
  Stack,
  Chip,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Box,
  Alert,
  AlertTitle,
} from '@mui/material';
import {
  Telegram as TelegramIcon,
  Gavel as GavelIcon,
  GitHub as GitHubIcon,
  Search as SearchIcon,
  Autorenew as AutorenewIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
} from '@mui/icons-material';

const About: React.FC = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>

      <Card elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          Version 0.3.0
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip
            icon={<TelegramIcon />}
            label="Telegram"
            color="primary"
            component="a"
            href="https://t.me/+ualID7ueKuJjMWJk"
            clickable
          />
          <Chip
            icon={<GavelIcon />}
            label="MIT License"
            color="success"
          />
        </Stack>
      </Card>

      <Typography variant="body1" sx={{marginBottom: '0.75'}} paragraph>
        This project provides a template for developers and traders to leverage delta-neutral arbitrage opportunities between various perpetual futures platforms. The current version focuses on GMX vs HMX pairs, detecting and executing arbitrage opportunities.
      </Typography>

      <Button
        variant="contained"
        startIcon={<GitHubIcon />}
        href="https://github.com/50shadesofgwei/GMXFundingRateArbitrage"
        sx={{ mt: 2, mb: 2 }}
      >
        View on GitHub
      </Button>

      <Typography variant="h5" gutterBottom>
        Key Features
      </Typography>

      <List>
        <ListItem>
          <ListItemIcon><SearchIcon /></ListItemIcon>
          <ListItemText primary="Detects funding rate discrepancies" />
        </ListItem>
        <ListItem>
          <ListItemIcon><AutorenewIcon /></ListItemIcon>
          <ListItemText primary="Executes delta-neutral arbitrage trades" />
        </ListItem>
        <ListItem>
          <ListItemIcon><AccountBalanceWalletIcon /></ListItemIcon>
          <ListItemText primary="Supports Arbitrum (GMX and HMX)" />
        </ListItem>
      </List>

      <Typography variant="h5" gutterBottom>
        Getting Started
      </Typography>

      <Stepper orientation="vertical">
        <Step active>
          <StepLabel>Clone the repository</StepLabel>
          <StepContent>
            <Typography>
              Use SSH: <code>git clone git@github.com:50shadesofgwei/GMXFundingRateArbitrage.git</code>
              <br />
              Or HTTPS: <code>git clone https://github.com/50shadesofgwei/GMXFundingRateArbitrage.git</code>
            </Typography>
          </StepContent>
        </Step>
        <Step active>
          <StepLabel>Install dependencies</StepLabel>
          <StepContent>
            <Typography>
              Run: <code>pip install -r requirements.txt</code>
              <br />
              Then: <code>pip install -e .</code>
            </Typography>
          </StepContent>
        </Step>
        <Step active>
          <StepLabel>Configure environment variables</StepLabel>
          <StepContent>
            <Typography>
              Set up API keys, wallet addresses, and other parameters in the .env file
            </Typography>
          </StepContent>
        </Step>
      </Stepper>

      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
        Usage
      </Typography>

      <Box sx={{ mt: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Available CLI Commands:
        </Typography>
        <List>
          <ListItem>
            <Chip label="is-position-open" color="primary" />
          </ListItem>
          <ListItem>
            <Chip label="deploy-collateral-gmx [amount]" color="primary" />
          </ListItem>
          <ListItem>
            <Chip label="deploy-collateral-hmx [token_address] [amount]" color="primary" />
          </ListItem>
          <ListItem>
            <Chip label="project-run" color="primary" />
          </ListItem>
          <ListItem>
            <Chip label="project-run-demo" color="primary" />
          </ListItem>
          <ListItem>
            <Chip label="close-position-pair [symbol]" color="primary" />
          </ListItem>
        </List>
      </Box>

      <Alert severity="warning" sx={{ mt: 2, mb: 2 }}>
        <AlertTitle>Important Note</AlertTitle>
        This project requires some beginner/intermediate programming knowledge to set up and run effectively.
      </Alert>

      <Typography variant="h5" gutterBottom>
        Contributions
      </Typography>

      <Card sx={{ p: 2, mt: 2, mb: 2 }}>
        <Typography variant="body1" sx={{marginBottom: '0.75'}}>
          This is an open-source project, and contributions are welcome. To get involved, join the Telegram chat.
        </Typography>
        <Button
          variant="outlined"
          startIcon={<TelegramIcon />}
          href="https://t.me/+ualID7ueKuJjMWJk"
          sx={{ mt: 2 }}
        >
          Join Telegram Chat
        </Button>
      </Card>
    </div>
  );
};

export default About;

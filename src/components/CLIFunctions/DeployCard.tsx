import { Box, Button, TextField, InputAdornment, Card, CardContent, Avatar, Typography } from "@mui/material"

const sxInput = {
    width: '200px',
        '& .MuiOutlinedInput-root': {
        '& fieldset': {
        borderColor: 'secondary.main',
        },
        '&:hover fieldset': {
        borderColor: 'secondary.light',
        },
        '&.Mui-focused fieldset': {
        borderColor: 'secondary.dark',
        },
    },
    margin: '1em 0 0 0',
};

interface DeployCardProps {
    args: {
        amount: string;
        tokenAddress: string;
    };
    handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleError: boolean;
    exchange: string;
    exchangeLogo: string;
    collateralBalance: string;
    handleDeploy: () => void;
}

const DeployCard = ({args, handleAmountChange, handleError, exchange, exchangeLogo, collateralBalance, handleDeploy}: DeployCardProps) => {
  return (
    <Card className="deploy-HMX" sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1em',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar src={exchangeLogo} alt="Exchange Logo" sx={{ mr: 1 }} />
            <Typography variant="h6">{exchange}</Typography>
          </Box>

          <Typography 
          variant="body1" 
          fontWeight="bold" 
          mb={2}
        >
          Balance: <span style={{ color: '#1976d2' }}>${collateralBalance}</span>
        </Typography>
          <TextField
            sx={sxInput}
            type="number"
            placeholder="Enter Amount"
            variant="outlined"
            color="secondary"
            value={args.amount}
            onChange={handleAmountChange}
            error={handleError}
            helperText={handleError ? "Amount must be 1 or greater" : ""}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
          <TextField
            sx={sxInput}
            type="text"
            placeholder="Token Address"
            variant="outlined"
            color="secondary"
            value={args.tokenAddress}
            onChange={handleAmountChange}
            error={handleError}
            helperText={handleError ? "Amount must be 1 or greater" : ""}
            InputProps={{
              startAdornment: <InputAdornment position="start"></InputAdornment>,
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleDeploy}
            fullWidth
            sx={{ mt: 2 }}
          >
            Deploy
          </Button>
          
        </CardContent>
      </Card>
  )
}

export default DeployCard

{/* <Card>
<CardContent>
  <Box display="flex" alignItems="center" mb={2}>
    <Avatar src={exchangeLogo} alt="Exchange Logo" sx={{ mr: 1 }} />
    <Typography variant="h6">Deploy Command</Typography>
  </Box>

  <Typography variant="body2" color="text.secondary" mb={2}>
    Current Collateral Balance: {collateralBalance}
  </Typography>

  <TextField
    fullWidth
    label="Amount"
    variant="outlined"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
    margin="normal"
  />

  <TextField
    fullWidth
    label="Address"
    variant="outlined"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    margin="normal"
  />

  <Button
    variant="contained"
    color="primary"
    onClick={handleDeploy}
    fullWidth
    sx={{ mt: 2 }}
  >
    Deploy
  </Button>
</CardContent>
</Card> */}
import { Box, Button, Typography, TextField, InputAdornment} from "@mui/material";
import DeploySection from "./CLIFunctions/DeploySection";

const serverRun = () => {
    fetch('http://127.0.0.1:5000/run', {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

const serverDemo = () => {
    fetch('http://127.0.0.1:5000/demo', {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

const serverOpen = () => {
    fetch('http://127.0.0.1:5000/open', {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

const serverClose = () => {
    fetch('http://127.0.0.1:5000/close', {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

/** 
 * Deploy Collateral on chain by sending request to backend 
 */
const serverDeploy = (exchange: String, amount: number) => {
    switch (exchange) {
        case 'HMX':
            console.log("HMX");
            break;
        case 'OKX':
            console.log("SNX");
            break;
        case 'GMX':
            console.log("GMX");
            break;   
    }
}

// Styles
const sxButtons = {width: '5em'};

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
};

const CLIFunctions = () => {

    return (
        <Box className='cliFunctions' sx={{
            display: 'flex',
            flexDirection: 'column', 
            gap: '1em',  
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2em',
            backgroundColor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 3,         
        }}>
            <Button sx={sxButtons} color="secondary" variant="contained" className="run" onClick={serverRun}>Run</Button>
            <Button sx={sxButtons} color="secondary" variant="contained" className="demo" onClick={serverDemo}>Demo</Button>
            <Box className="open-position">
                <Button sx={sxButtons} color="secondary" variant="contained" onClick={serverOpen}>Open</Button>

            </Box>
            <Box className="close-position">
                <Button sx={sxButtons} color="secondary" variant="contained" onClick={serverClose}>Close</Button>
            </Box>
            <DeploySection />
        </Box>
    );
};

export default CLIFunctions;

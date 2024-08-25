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

// Styles
const sxButtons = {width: '5em'};

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
            <Button sx={sxButtons} color="secondary" variant="contained" onClick={serverRun}>Run</Button>
            <Button sx={sxButtons} color="secondary" variant="contained" onClick={serverDemo}>Demo</Button>
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

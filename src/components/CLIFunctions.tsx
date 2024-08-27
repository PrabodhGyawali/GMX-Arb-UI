import { Box, Button} from "@mui/material";
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

export const DeployCollateral = () => {
    return (
        <DeploySection />
    );
};

// Styles
const sxButtons = {width: '5em', fontSize: '1.5em'};

export const Run = () => {
    return (
        <Box sx={{display: 'flex', gap: '1em', justifyContent: 'space-around', width: '100%'}}>
                <Button sx={sxButtons} color="primary" variant="contained" onClick={serverRun}>Run</Button>
                <Button sx={sxButtons} color="secondary" variant="contained" onClick={serverDemo}>Demo</Button>
        </Box>
    );
}
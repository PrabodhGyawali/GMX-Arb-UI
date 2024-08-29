import { Box, Button} from "@mui/material";
import DeploySection from "./CLIFunctions/DeploySection";
import { useState } from "react";
import { useSocket } from "../Context/SocketContext";

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
    const { connected } = useSocket();
    const [isRunning, setIsRunning] = useState(false);

    const serverRun = () => {
        if (!isRunning) {
            fetch('http://127.0.0.1:5000/run', {
                method: 'POST',
            }).then(response => {
                if (response.ok) {
                    setIsRunning(true);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            fetch('http://127.0.0.1:5000/stop-run', {
                method: 'POST',
            }).then(response => {
                if (response.ok) {
                    setIsRunning(true);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } 
    };

    return (
        <Box sx={{display: 'flex', gap: '1em', justifyContent: 'space-around', width: '100%'}}>
            <Button sx={sxButtons} color="primary" variant="contained" onClick={serverRun}
                    disabled={!connected}
            >{isRunning}</Button>
            <Button sx={sxButtons} color="secondary" variant="contained" onClick={serverDemo}
                    disabled={!connected}
            >Demo</Button>
        </Box>
    );
}
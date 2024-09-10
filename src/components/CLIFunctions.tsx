import { Box, Button } from "@mui/material";
import DeploySection from "./CLIFunctions/DeploySection";
import { useState, useEffect } from "react";
import { useSocket } from "../Context/SocketContext";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

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

const textAnimation = keyframes`
  0% { content: "Running"; }
  33% { content: "Running."; }
  66% { content: "Running.."; }
  100% { content: "Running..."; }
`;

const AnimatedButton = styled(Button)`
  &.running {
    background-color: #4caf50;
    &::after {
      content: "Running";
      animation: ${textAnimation} 1.5s infinite;
    }
  }
`;

export const Run = () => {
    const { connected } = useSocket();
    const [isRunning, setIsRunning] = useState(false);
    const [buttonText, setButtonText] = useState("Run");

    useEffect(() => {
        // Check whether bot is running or not
        if (isRunning) {
            setButtonText("");
        } else {
            setButtonText("Run");
        }
    }, [isRunning]);

    const serverStop = () => {
        const backendUrl = localStorage.getItem('backendURL');
        fetch(`${backendUrl}/stop`, {
          method: 'POST',
        }).then(response => {
          if (response.ok) {
            setIsRunning(false);
          }
        })
        .catch(error => {
          console.error('serverStop Error: ', error);
        });
    };

    const serverRun = () => {
        if (isRunning) {
            serverStop();
        }
        else {
            const backendUrl = localStorage.getItem('backendURL');
            fetch(`${backendUrl}/run`, {
                method: 'POST',
            }).then(response => {
                if (response.ok) {
                    setIsRunning(true);
                }
            })
            .catch(error => {
                console.error('serverRun Error: ', error);
            });
        }  
    };

    return (
        <Box sx={{display: 'flex', gap: '1em', justifyContent: 'space-around', width: '100%'}}>
            <AnimatedButton 
                sx={sxButtons} 
                color="primary" 
                variant="contained" 
                onClick={serverRun}
                disabled={!connected}   
                className={isRunning ? 'running' : ''}
            >
                {buttonText}
            </AnimatedButton>
            <Button 
                sx={sxButtons} 
                color="secondary" 
                variant="contained" 
                onClick={serverDemo}
                disabled={!connected}
            >
                Demo
            </Button>
        </Box>
    );
}
import { Box, Button } from "@mui/material";
// import DeploySection from "./CLIFunctions/DeploySection";
import { useState, useEffect } from "react";
import { useSocket } from "../Context/SocketContext";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import DemoOppDialog from "./CLIFunctions/DemoOpportunityDialog"
import TradeIcon from '@mui/icons-material/ShowChart';

const serverDemo = () => {
    const backendUrl = localStorage.getItem('backendURL');
    fetch(`${backendUrl}/demo`, {
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

// export const DeployCollateral = () => {
//     return (
//         <DeploySection />
//     );
// };

// Styles
const sxButtons = {width: '5em', fontSize: '1.5em', position: 'relative'};

const textAnimation = keyframes`
  0% { content: ""; }
  33% { content: "."; }
  66% { content: ".."; }
  100% { content: "..."; }
`;

const AnimatedButton = styled(Button)`
  &.running {
    background-color: #4caf50;
    &::after {
      content: "Running";
      animation: ${textAnimation} 1.5s infinite;
    }
  }
  &.demo-running {
    background-color: #ff9800;
    &::after {
      content: "Demo";
      animation: ${textAnimation} 1.5s infinite;
    }
  }
`;

export const Run = () => {
    const { connected } = useSocket();
    const [isRunning, setIsRunning] = useState(false);
    const [isDemoRunning, setIsDemoRunning] = useState(false);
    const [isTradeExecuting, setIsTradeExecuting] = useState(false);
    const [buttonText, setButtonText] = useState("Run");
    const [demoButtonText, setDemoButtonText] = useState("Demo");
    

    const serverStop = () => {
        console.log('Stopping bot');
        const backendUrl = localStorage.getItem('backendURL');
        fetch(`${backendUrl}/stop`, {
          method: 'POST',
        }).then(response => {
          if (response.ok) {
            setIsRunning(false);
          }
          console.log(response);

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
                else {
                    alert(`Error starting bot: ${response.statusText}`);
                }
            })
            .catch(error => {
                console.error('serverRun Error: ', error);
            });
        }  
    };

    const runDemo = () => {
        setIsDemoRunning(true);
        serverDemo();
        // Simulate demo running for 5 seconds
        setTimeout(() => {
            setIsDemoRunning(false);
        }, 5000);
    };

    
    useEffect(() => {
        if (isRunning) {
            setButtonText("");
        } else {
            setButtonText("Run");
        }
    }, [isRunning]);

    useEffect(() => {
        if (isDemoRunning) {
            setDemoButtonText("");
        } else {
            setDemoButtonText("Demo");
        }
    }, [isDemoRunning]);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        const checkBotStatus = () => {
            const backendUrl = localStorage.getItem('backendURL');
            fetch(`${backendUrl}/status`)
                .then(response => response.json())
                .then(data => {
                    setIsRunning(data.is_running);
                    setIsDemoRunning(data.demo_running);
                    setIsTradeExecuting(data.is_executing_trade);
                })
                .catch(error => {
                    console.error('Error checking bot status:', error);
                });
        };

        if (connected) {
            // Initial check
            checkBotStatus();
            // Set up polling every 5 seconds
            intervalId = setInterval(checkBotStatus, 5000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [connected]);

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
                {isTradeExecuting && (
                    <TradeIcon 
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 1,
                        }}
                    />
                )}
            </AnimatedButton>
            <AnimatedButton 
                sx={sxButtons} 
                color="secondary" 
                variant="contained" 
                onClick={runDemo}
                disabled={!connected}
                className={isDemoRunning ? 'demo-running' : ''}
            >
                {demoButtonText}
            </AnimatedButton>
            <DemoOppDialog />
        </Box>
    );
}
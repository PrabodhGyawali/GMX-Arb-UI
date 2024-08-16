import { Box, Button } from "@mui/material";

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

const CLIFunctions = () => {
    // enum CliButtons {
    //     serverRun,
    //     serverDemo,
    //     serverOpen,
    //     serverClose,
    //     serverDeploy,
    // } // TODO: apply this enum

    return (
        <Box className='cliFunctions' sx={{
            alignItems: 'center'
        }}>
            <Button className="run" onClick={serverRun}>Run</Button>
            <Button className="demo" onClick={serverDemo}>Demo</Button>
            <div className="open-position">
                <Button onClick={serverOpen}>Open</Button>

            </div>
            <div className="close-position">
                <Button onClick={serverClose}>Close</Button>
            </div>
            <div className="deploy">
                <h3>Deploy</h3>
                <div className="deploy-HMX">
                    <Button>HMX</Button>
                    <input type="text" placeholder="Enter Amount" />
                </div>
                <div className="deploy-sythetix">
                    <Button>Synthetix</Button>
                    <input type="text" placeholder="Enter Amount" /> 
                </div>
            </div>
        </Box>
    );
};

export default CLIFunctions;

// .cliFunctions {
//     align-items: center;
//     button {
//         background-color: $color-tertiary;
//         border: none;
//         color: white;
//         padding: 15px 32px;
//         text-align: center;
//         text-decoration: none;
//         display: inline-block;
//         font-size: 16px;
//         border-radius: 4px;
//         cursor: pointer;
//     }
//     button:hover {
//         box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
//     }
//     button:active {
//         background-color: $color-secondary;
//         box-shadow: none;
//     }
//     // Run Button
//     .run {
//     }

//     .deploy {
//         input {
            
//         }
//     } // Deploy div: button & input
//     .close {

//     }
//     .open {

//     }
// }

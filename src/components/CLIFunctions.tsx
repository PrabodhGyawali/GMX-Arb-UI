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
        <div className='cliFunctions'>
            <button className="run" onClick={serverRun}>Run</button>
            <button className="demo" onClick={serverDemo}>Demo</button>
            <div className="open-position">
                <button onClick={serverOpen}>Open</button>

            </div>
            <div className="close-position">
                <button onClick={serverClose}>Close</button>
            </div>
            <div className="deploy">
                <h3>Deploy</h3>
                <div className="deploy-HMX">
                    <button>HMX</button>
                    <input type="text" placeholder="Enter Amount" />
                </div>
                <div className="deploy-sythetix">
                    <button>Synthetix</button>
                    <input type="text" placeholder="Enter Amount" /> 
                </div>
            </div>
        </div>
    );
};

export default CLIFunctions;
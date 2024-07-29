
// const run = () => {
//     console.log('Run');
// }

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

const CLIFunctions = () => {
    return (
        <div className='cliFunctions'>
            <button onClick={serverRun}>Run</button>
            <button onClick={serverDemo}>Demo</button>
            <button onClick={serverOpen}>Open</button>
            <button onClick={serverClose}>Close</button>
            <div className="deploy">
                <button className="">Deploy HMX</button>
                <button className="">Deploy Synthetix</button>
                <input type="text" placeholder="Enter Amount" />
            </div>
        </div>
    );
};

export default CLIFunctions;
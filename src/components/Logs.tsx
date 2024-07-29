import {useState, useEffect, ReactElement} from 'react'

interface Logs {
    /* Add fields an create classes with methods etc... */
}

function Logs() {
    const [logs, setLogs] = useState<String[]>([]);

    const getLogs = async () => {
        try {
            const response = await fetch("/api/logs/app");
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`)
            }
            const json: JSON = await response.json();
            const logs = json.parse("logs");
            console.log(logs);
            setLogs(logs);
        } catch(err) {
            console.log("Err: ", err);
        }
    }

    const clearLogs = async (event: React.MouseEvent<HTMLButtonElement>) => {
        if (event) {
            event.preventDefault();
            var logList = document.querySelector("logList");
            if (logList) {
                logList.innerHTML = "";
            }
        }
        try {
            const response = await fetch("/api/logs/app", {
                method: 'POST'
            });
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
        } catch(err) {console.error(err)}
    }

    // TODO: Maybe allow user to save log on browser using Storage API `localStorage` 

    useEffect(() => {
        getLogs();
        return () => {
            // var logs = document.querySelector('Logs');
            // if (logs) {
            //     logs.innerHTML = "";
            // }
        }
    }, []);

    return (
        <section className='Logs'>
            <h2>Logs</h2>
            <button onClick={clearLogs}>Clear</button>
            <ul className='logList'>
                {logs.map( log => 
                    <li>{log}</li>
                )}
            </ul>
        </section>
    );
}

export default Logs
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
            const json_obj = await response.json();
            const logs = json_obj["logs"];
            setLogs(logs);
        } catch(err) {
            console.log("Err: ", err);
        }
    }

    const clearLogs = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        var logList = document.querySelector(".logList");
        if (logList) {
            logList.innerHTML = "";
        }

        try {
            const response = await fetch("/api/logs/clear", {
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
        <section className="Logs">
            <div className="LogHeader">
                <h2>Logs</h2>
                <button className="LogExpand"></button>
            </div>
            {/* <button onClick={clearLogs}>Clear</button> */}
            <hr />
            <div className='LogList'>
                {logs.map( log => 
                    <div className='log'>{log}</div>
                )}
            </div>
        </section>
    );
}

export default Logs
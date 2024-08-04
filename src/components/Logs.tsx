import {useState, useEffect, ReactElement} from 'react'
import CustomSVG from "../../public/svg/createArrowSVG"

interface Logs {
    /* Add fields an create classes with methods etc... */
}

function Logs() {
    const [logs, setLogs] = useState<String[]>([]);

    /**
     * Backend Log communication
     */
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

    /**
     * Button slider-related functions
     */
    const collapse_logs = () => {

    }
    const expand_logs = () => {

    }

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
                <CustomSVG
                    size={24}
                    ratio={1}
                    direction="up"
                    isExpanded={true}
                    className="custom-svg"
                    // style={{ fill: 'blue', stroke: 'red'}}
                /> 
                {/* TODO: Add hover effect on svg and event */}
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
import {useState, useEffect} from 'react'
import { Box} from '@mui/material';
import LogTable from './LogsTable/LogTable';
import { useSocket } from '../Context/SocketContext';

enum Level {
    NOTSET = "NOTSET",
    DEBUG = "DEBUG",
    INFO = "INFO",
    WARNING = "WARNING",
    ERROR = "ERROR",
    CRITICAL = "CRITICAL"
}



export interface Log {
    id: string,
    timestamp: Date,
    logger: string,
    level: Level,
    source: string,
    message: string,
}

function createLogObjects(logEntries: string[]) : Log[] {
    const logs: Log[] = [];
    const pattern = /(?<timestamp>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2},\d{3}) - (?<logger>[^ -]+) - (?<level>\w+) - (?<source>[^ -]+) - (?<message>.+)/;

    logEntries.forEach(logEntry => {
        const match = pattern.exec(logEntry);
        if (match && match.groups) {
            const { timestamp, logger, level, source, message } = match.groups;
            logs.push({
                id: timestamp.replace(',', '.'),
                timestamp: new Date(timestamp.replace(',', '.')),
                logger: logger,
                level: level as Level,
                source: source,
                message: message
            })
        }
    });
    return logs;
}

function Logs({eventLogs}: {eventLogs: string}) {
    const [logs, setLogs] = useState<Log[]>([]);
    const {socket} = useSocket();

    socket?.on('log', (data) => {
        const newLog = createLogObjects([data]);
        setLogs([...logs, ...newLog]);
    });
    
    /**
     * Get log history from the server's `app.log` file
     */
    const getLogs = async () => {
        try {
            const response = await fetch("/api/logs/app");
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`)
            }
            const json_obj = await response.json();
            const logEntries = json_obj["logs"];
            const logObjects = createLogObjects(logEntries); 
            setLogs(logObjects);
        } catch(err) {
            console.log(`Err: ${err}`);
        }
    }

    // TODO: Implement when DB is implemented
    // const clearLogs = async (event: React.MouseEvent<HTMLButtonElement>) => {
    //     event.preventDefault();
    //     setLogs([]);

    //     try {
    //         const response = await fetch("/api/logs/clear", {
    //             method: 'POST'
    //         });
    //         if (!response.ok) {
    //             throw new Error(`HTTP Error: ${response.status}`);
    //         }
    //     } catch(err) {console.error(err)}
    // }

    useEffect(() => {
        getLogs();
        if (eventLogs) {
            const newLog = createLogObjects([eventLogs]);
            setLogs([...logs, ...newLog]);
        }
        return () => {
            
        }
    }, []);

    return (
        <Box className="Logs" sx={{width: 'inherit'}}>
            <Box className='LogList'>
                <LogTable logs={logs} />
            </Box>
        </Box>

        // Go over this documentation: https://mui.com/material-ui/react-table/
    );
}

export default Logs
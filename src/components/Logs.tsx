import {useState, useEffect} from 'react'
import { IconButton, Box, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LogTable from './LogsTable/LogTable';


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

const logArray = [
    "2024-08-20 13:37:09,586 - GlobalUtils.logger - INFO - TradeLogger - Database accessed successfully.",
    "2024-08-20 13:37:18,769 - GlobalUtils.logger - INFO - SynthetixPositionController - Collateral balance called successfully: 19.0",
    "2024-08-20 13:37:18,769 - GlobalUtils.logger - INFO - MasterPositionController:get_available_collateral_for_exchange - collateral = 19.0 for exchange Synthetix",
    "2024-08-20 13:37:25,262 - GlobalUtils.logger - INFO - MasterPositionController:get_available_collateral_for_exchange - collateral = 17.3869 for exchange ByBit"
];

function Logs({eventLogs}: {eventLogs: string}) {
    const [logs, setLogs] = useState<Log[]>([]);
    const [toggleLogs, setToggleLogs] = useState(false);
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
            const mockLogObjects = createLogObjects(logArray);
            setLogs(mockLogObjects);
            console.log(mockLogObjects);
        }
    }

    const clearLogs = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setLogs([]);

        try {
            const response = await fetch("/api/logs/clear", {
                method: 'POST'
            });
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
        } catch(err) {console.error(err)}
    }

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
        <Box className="Logs">
            <Box className="LogHeader" 
                sx={{
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    width: 'inherit',
                }}>
                <Typography>
                    Logs
                </Typography>
                <IconButton>
                    {toggleLogs ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            </Box>
            
            <Box className='LogList'>
                <LogTable logs={logs} />
            </Box>
        </Box>

        // Go over this documentation: https://mui.com/material-ui/react-table/
    );
}

export default Logs
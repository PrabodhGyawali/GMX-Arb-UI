// https://mui.com/material-ui/react-table/
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Log } from 'components/Logs';

interface LogTableProps {
    logs: Log[];
}

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds},${milliseconds}`;
}


const LogTable: React.FC<LogTableProps> = ({
    logs
}) => {
    const logsWithId = logs.map((log, index) => ({ ...log, id: index.toString() }));
    const formattedLogs = logsWithId.map((log) => ({
            ...log,
            timestamp: formatDate(log.timestamp),
    }))
    .sort((a, b) => parseInt(b.id) - parseInt(a.id));;
    const columns: GridColDef<(typeof logs)[number]>[] = [
        { field: 'timestamp', 
            headerName: 'Timestamp', 
            type: 'string',
            width: 150 },
        {
            field: 'logger',
            headerName: 'Logger',
            type: 'string',
            width: 150,
        },
        {
            field: 'level',
            headerName: 'Level',
            type: 'string',
            width: 100,
        },
        {
            field: 'source',
            headerName: 'Source',
            type: 'string',
            width: 200,
        },
        {
            field: 'message',
            headerName: 'Message',
            width: 400,
        },
    ];
  return (
    <Box sx={{ height: 400, width: 'inherit' }}>
      <DataGrid
        rows={formattedLogs}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  )
}

export default LogTable
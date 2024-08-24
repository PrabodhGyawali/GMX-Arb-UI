// https://mui.com/material-ui/react-table/
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Log } from 'components/Logs';

interface LogTableProps {
    logs: Log[];
}


const LogTable: React.FC<LogTableProps> = ({
    logs
}) => {
    const columns: GridColDef<(typeof logs)[number]>[] = [
        { field: 'timestamp', 
            headerName: 'Timestamp', 
            type: 'date',
            width: 90 },
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
            width: 150,
        },
        {
            field: 'source',
            headerName: 'Source',
            type: 'string',
            width: 110,
        },
        {
            field: 'message',
            headerName: 'Message',
            width: 160,
        },
    ];
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={logs}
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
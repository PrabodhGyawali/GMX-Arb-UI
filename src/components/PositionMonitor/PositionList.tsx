import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Typography,
  styled,
  CircularProgress,
  Button
} from '@mui/material';
import { usePosition } from '../../Context/PositionContext';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.common.white,
  borderBottom: `1px solid ${theme.palette.grey[800]}`,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.grey[800],
  },
}));

const TradingPositionsTable: React.FC = () => {
    const { positions, openPositions, closedPositions, loading, error, closePosition, fetchPositions } = usePosition();
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        fetchPositions();
    }, [fetchPositions]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const filteredPositions = tabValue === 0 ? openPositions : closedPositions;

    if (loading) {
        return (
            <Paper sx={{ width: '100%', backgroundColor: '#1e222d', display: 'flex', justifyContent: 'center', padding: '20px' }}>
                <CircularProgress />
            </Paper>
        );
    }

    if (error) {
        return (
            <Paper sx={{ width: '100%', backgroundColor: '#1e222d', padding: '20px' }}>
                <Typography color="error">{error}</Typography>
            </Paper>
        );
    }

    return (
        <Paper sx={{ width: '100%', backgroundColor: '#1e222d' }}>
            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
                sx={{
                    '& .MuiTab-root': {
                        color: 'white',  // This sets all tabs to white
                        opacity: 0.7,    // Slightly dim inactive tabs
                        '&.Mui-selected': {
                            color: 'white',  // Keep selected tab white
                            opacity: 1,      // Full opacity for active tab
                    },
                },
        }}
            >
                <Tab label={`Open (${openPositions.length})`} />
                <Tab label={`Closed (${closedPositions.length})`} />
            </Tabs>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Symbol</StyledTableCell>
                            <StyledTableCell>Side</StyledTableCell>
                            <StyledTableCell>Size</StyledTableCell>
                            <StyledTableCell>Liq Price</StyledTableCell>
                            <StyledTableCell>Open Time</StyledTableCell>
                            <StyledTableCell>PNL</StyledTableCell>
                            <StyledTableCell>Funding</StyledTableCell>
                            <StyledTableCell>Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPositions.length === 0 ? (
                            <StyledTableRow>
                                <StyledTableCell colSpan={8} align="center">
                                    <Typography>You have no {tabValue === 0 ? 'open' : 'closed'} positions</Typography>
                                </StyledTableCell>
                            </StyledTableRow>
                        ) : (
                            filteredPositions.map((position) => (
                                <StyledTableRow key={position.id}>
                                    <StyledTableCell>{position.symbol}</StyledTableCell>
                                    <StyledTableCell>{position.side}</StyledTableCell>
                                    <StyledTableCell>{position.size_in_asset}</StyledTableCell>
                                    <StyledTableCell>{position.liquidation_price}</StyledTableCell>
                                    <StyledTableCell>{new Date(position.open_time).toLocaleString()}</StyledTableCell>
                                    <StyledTableCell>{position.pnl}</StyledTableCell>
                                    <StyledTableCell>{position.accrued_funding}</StyledTableCell>
                                    <StyledTableCell>
                                        {tabValue === 0 && (
                                            <Button 
                                                variant="contained" 
                                                color="secondary" 
                                                size="small"
                                                onClick={() => closePosition(position.id)}
                                            >
                                                Close
                                            </Button>
                                        )}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default TradingPositionsTable;
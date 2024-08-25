import React, {useState} from 'react'
import { Trade } from 'components/TradeMonitorInterface';
import PositionCard from './PositionCard'
import { Box, TextField, Button, Typography, Container, Grid, Paper, 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel
} from '@mui/material';

interface PositionListProps {
    trades: Trade[];
}


const PositionList: React.FC<PositionListProps> = ({ trades }: PositionListProps) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showHistory, setShowHistory] = useState<boolean>(false);
    
    const filteredTrades = trades.filter((trade) => 
        trade.symbol.toLowerCase()
                    .includes(searchTerm.toLowerCase()) && (showHistory || trade.open_close === 'Open'));
    return (
        // Container centers content and provides consistent padding
        <Container maxWidth="lg">
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Position Monitor
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='Search by Symbol'
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                        margin='normal'
                    />
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => setShowHistory(!showHistory)}
                    >{showHistory ? 'Hide History' : 'Show History'}</Button>
                </Box>
                
                <Grid container spacing={3}>
                    {filteredTrades.map((trade) => (
                        <Grid item xs={12} sm={6} md={4} key={trade.id}>
                            <PositionCard {...trade} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    )
}

export default PositionList

{/* <Box id="open-positions">
                {mockTrades.map((trade: Trade) => (
                    <PositionCard 
                        id={trade.id}
                        strategy_execution_id={trade.strategy_execution_id}
                        exchange={trade.exchange}
                        symbol={trade.symbol}
                        side={trade.side}
                        is_hedge={trade.is_hedge}
                        size_in_asset={trade.size_in_asset}
                        liquidation_price={trade.liquidation_price}
                        open_close={trade.open_close}
                        open_time={trade.open_time}   
                        closePosition={() => closePosition(trade.id)}
                    />
                ))}
</Box> */}
    
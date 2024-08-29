import React, {useState} from 'react'
import { Trade } from './Trade';
import PositionCard from './PositionCard'
import { Box, TextField, Button, Typography, Container, Grid} from '@mui/material';

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
                        sx={{width: '20%'}}
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
                
                <Box sx={{
                    maxHeight: '100vh',
                    overflow: 'auto',
                }}>
                    {filteredTrades.length === 0 ? (
                        <Typography variant="h6" component="p" align="center">
                            No open positions found.
                        </Typography>
                    ) : (
                        <Grid container spacing={3} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'stretch',
                        }}>
                            {filteredTrades.map((trade) => (
                                <Grid item xs={12} sm={6} md={4} key={trade.id}>
                                    <PositionCard {...trade} />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Box>
            </Box>
        </Container>
    )
}

export default PositionList

    
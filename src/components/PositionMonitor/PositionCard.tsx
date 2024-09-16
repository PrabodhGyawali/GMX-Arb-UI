import React, { useEffect } from 'react';
import { usePosition } from '../../Context/PositionContext';
import { 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Chip, 
  Box, 
  Divider,
  Tooltip,
  IconButton
} from "@mui/material";
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import HelpOutlineIcon  from '@mui/icons-material/HelpOutline';


interface PositionCardProps {
    id: number;
    strategy_execution_id: string;
    exchange: string;
    symbol: string;
    side: string;
    is_hedge: boolean;
    size_in_asset: number;
    liquidation_price: number;
    open_close: string;
    open_time: Date;
    // Below is only if the position is closed
    close_time?: Date;
    pnl?: number;
    accrued_funding?: number;
    close_reason?: string;
}

const StyledCard = styled(Card, {
    shouldForwardProp: (prop) => prop !== 'isClosed',
  })<{ isClosed: boolean }>(({ theme, isClosed }) => ({
    marginBottom: theme.spacing(2),
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: theme.spacing(1),
    opacity: isClosed ? 0.6 : 1,
    backgroundColor: isClosed ? '#f0f0f0' : 'white',
  }));

const StyledButton = styled(Button)(() => ({
  fontWeight: 'bold',
}));

const PositionCard: React.FC<PositionCardProps> = ({ 
    id,
    strategy_execution_id,
    exchange,
    symbol,
    side,
    size_in_asset,
    liquidation_price,
    open_close,
    open_time,
    close_time,
    pnl,
    accrued_funding,
    close_reason
}) => {
    const isClosed = open_close === 'Close';
    const isLong = side.toLowerCase() === 'long';


    // Hook to close position context
    const { closePosition } = usePosition();

    const calculateDuration = (openTime: Date, closeTime?: Date): string => {
        const end = closeTime || new Date();
        const durationMs = end.getTime() - openTime.getTime();
        const hours = Math.floor(durationMs / (1000 * 60 * 60));
        const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
      };

    
    
    useEffect(() => {

    }, []);

    return (
        <StyledCard isClosed={isClosed}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            {symbol} Position
                        </Typography>
                        <Chip 
                            label={strategy_execution_id}
                            size="small"
                            color="primary"
                            style={{ marginBottom: '8px' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary">
                            Exchange
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {exchange}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary">
                            Side
                        </Typography>
                        <Chip 
                            label={side.toUpperCase()}
                            size="small"
                            color={isLong ? "success" : "error"}
                            style={{ 
                                backgroundColor: isLong ? '#4caf50' : '#f44336',
                                color: 'white'
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary">
                            Size in Asset
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {size_in_asset.toFixed(4)}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary">
                            Liquidation Price
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            ${liquidation_price.toFixed(2)}
                        </Typography>
                    </Grid>
                    {isClosed && (
                        <>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="textSecondary">
                                    PNL
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    ${pnl?.toFixed(2)}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="textSecondary">
                                    Accrued Funding
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    ${accrued_funding?.toFixed(2)}
                                </Typography>
                            </Grid>
                        </>
                    )}
                </Grid>
                <Divider style={{ margin: '16px 0' }} />
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="textSecondary">
                        {isClosed ? 'Closed' : 'Duration'}: {calculateDuration(open_time, close_time)}
                    </Typography>
                    {isClosed ? (
                        <Tooltip title={close_reason || 'No reason provided'}>
                            <IconButton size="small">
                                <HelpOutlineIcon />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <StyledButton
                            variant="contained"
                            color="secondary"
                            startIcon={<CloseIcon />}
                            onClick={() => closePosition(id)}
                        >
                            Close
                        </StyledButton>
                    )}
                </Box>
            </CardContent>
        </StyledCard>
    );
}

export default PositionCard;


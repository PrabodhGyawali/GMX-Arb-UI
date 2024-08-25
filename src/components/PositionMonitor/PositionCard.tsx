import React from 'react';
import { usePosition } from './PositionContext';

import { 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Chip, 
  Box, 
  Divider 
} from "@mui/material";
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';


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

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  fontWeight: 'bold',
}));

const PositionCard: React.FC<PositionCardProps> = ({ 
    id,
    strategy_execution_id,
    exchange,
    symbol,
    side,
    is_hedge,
    size_in_asset,
    liquidation_price,
    open_close,
    open_time,
}) => {
    const isBuy = side.toLowerCase() === 'buy';

    // Hook to close position context
    const { closePosition } = usePosition();

    const calculateDuration = (openTime: Date, closeTime?: Date): string => {
        const end = closeTime || new Date();
        const durationMs = end.getTime() - openTime.getTime();
        const hours = Math.floor(durationMs / (1000 * 60 * 60));
        const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
      };
    

    return (
        <StyledCard>
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
                            color={isBuy ? "success" : "error"}
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
                </Grid>
                <Divider style={{ margin: '16px 0' }} />
                <Box display="flex" justifyContent="flex-end">
                    <StyledButton
                        variant="contained"
                        color="secondary"
                        startIcon={<CloseIcon />}
                        onClick={() => closePosition(id)}
                    >
                        Close
                    </StyledButton>
                </Box>
            </CardContent>
        </StyledCard>
    );
}

export default PositionCard;


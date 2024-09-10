import { useState } from 'react'
import { Trade } from './PositionMonitor/Trade';
import { Box } from '@mui/material';
import { PositionProvider } from './PositionMonitor/PositionContext';
import PositionList from './PositionMonitor/PositionList';
import { useSocket } from '../Context/SocketContext';

function PositionMonitor() {
    const [trades, setTrades] = useState<Trade[]>([]);
    const {socket, backendUrl} = useSocket();

    socket?.on('trade_logged', () => {
      console.log('Trade fetch on trade_logged');
      getTrades();
    });

    socket?.on('connect', () => {
      console.log('Trade fetch on socket connect');
      getTrades();
    });

    /** Get Trade Logs from backend and setTrades useState */
    async function getTrades() {
        try {
            const response = await fetch(`${backendUrl}/trades/all`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const json = await response.json();
            // Map the JSON to Trade Interface
            const trades: Trade[] = json.map((trade: any[]) => ({
                id: trade[0],
                strategy_execution_id: trade[1],
                exchange: trade[2],
                symbol: trade[3],
                side: trade[4],
                is_hedge: trade[5],
                size_in_asset: trade[6],
                liquidation_price: trade[7],
                open_close: trade[8],
                open_time: trade[9] ? new Date(trade[9]) : null,
                close_time: trade[10] ? new Date(trade[10]) : null,
                pnl: trade[11],
                accrued_funding: trade[12],
                close_reason: trade[13]
            }));
            setTrades(trades);
        } catch(error) {
            console.log(`Error: ${error}`);
        }
    }

    const closePosition = (id: number) => {
      console.log(`Closing Position with ID: ${id}`);
    }

    return (
        <PositionProvider closePosition={closePosition}>
            <Box sx= {{display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <PositionList trades={trades} />
            </Box>
        </PositionProvider>
    )
}

export default PositionMonitor

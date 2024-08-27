import { useEffect, useState } from 'react'
import { Trade } from './PositionMonitor/Trade';
import { Box } from '@mui/material';
import { PositionProvider } from './PositionMonitor/PositionContext';
import PositionList from './PositionMonitor/PositionList';

function PositionMonitor() {
    const [trades, setTrades] = useState<Trade[]>([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);

    /** Get Trade Logs from backend and setTrades useState */
    async function getTrades() {
        try {
            const response = await fetch('api/trades/all');
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
            })); // TODO: Make sure getPositions is in Build as well
            setTrades(trades);
        } catch(error) {
            console.log(`Error: ${error}`);
        }
    }

    const closePosition = (id: number) => {
        console.log(`Closing Position with ID: ${id}`);
    }


    // Mock Trades for testing
    const mockTrades = [
        // Strategy 1 (Open)
        {
          id: 1,
          strategy_execution_id: "26efe6c6-ecfc-4791-968b-016d17cd2399",
          exchange: "HMX",
          symbol: "ARB/USD",
          side: "Long",
          is_hedge: true,
          size_in_asset: 1148.32077588181,
          liquidation_price: 0.491697579954884,
          open_close: "Open",
          open_time: new Date("2024-06-26T21:50:37.557Z"),
        },
        {
          id: 2,
          strategy_execution_id: "26efe6c6-ecfc-4791-968b-016d17cd2399",
          exchange: "Synthetix",
          symbol: "ARB/USD",
          side: "Short",
          is_hedge: false,
          size_in_asset: 1148.32,
          liquidation_price: 1.03763111795472,
          open_close: "Open",
          open_time: new Date("2024-06-26T21:50:37.557Z"),
        },
      
        // Strategy 2 (Open)
        {
          id: 3,
          strategy_execution_id: "7a1b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
          exchange: "Binance",
          symbol: "BTC/USDT",
          side: "Long",
          is_hedge: false,
          size_in_asset: 0.5,
          liquidation_price: 25000,
          open_close: "Open",
          open_time: new Date("2024-06-27T10:15:00.000Z"),
        },
        {
          id: 4,
          strategy_execution_id: "7a1b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
          exchange: "HMX",
          symbol: "BTC/USDT",
          side: "Short",
          is_hedge: true,
          size_in_asset: 0.5,
          liquidation_price: 27000,
          open_close: "Open",
          open_time: new Date("2024-06-27T10:15:00.000Z"),
        },
      
        // Strategy 3 (Open)
        {
          id: 5,
          strategy_execution_id: "8f2a4b6c-7d9e-1g3h-5i7j-2k4l6m8n0p2q",
          exchange: "Synthetix",
          symbol: "ETH/USD",
          side: "Long",
          is_hedge: false,
          size_in_asset: 10,
          liquidation_price: 1800,
          open_close: "Open",
          open_time: new Date("2024-06-28T09:45:00.000Z"),
        },
        {
          id: 6,
          strategy_execution_id: "8f2a4b6c-7d9e-1g3h-5i7j-2k4l6m8n0p2q",
          exchange: "Bybit",
          symbol: "ETH/USD",
          side: "Short",
          is_hedge: true,
          size_in_asset: 10,
          liquidation_price: 2200,
          open_close: "Open",
          open_time: new Date("2024-06-28T09:45:00.000Z"),
        },
      
        // Strategy 4 (Closed)
        {
          id: 7,
          strategy_execution_id: "3e5d7c9b-1a2f-4g6h-8i0j-9k1l3m5n7p9r",
          exchange: "ByBit",
          symbol: "SOL/USDT",
          side: "Long",
          is_hedge: false,
          size_in_asset: 500,
          liquidation_price: 15.5,
          open_close: "Close",
          open_time: new Date("2024-06-29T14:00:00.000Z"),
          close_time: new Date("2024-06-29T16:30:00.000Z"),
          pnl: 250.75,
          accrued_funding: 0.05,
          close_reason: "Take Profit",
        },
        {
          id: 8,
          strategy_execution_id: "3e5d7c9b-1a2f-4g6h-8i0j-9k1l3m5n7p9r",
          exchange: "OKX",
          symbol: "SOL/USDT",
          side: "Short",
          is_hedge: true,
          size_in_asset: 500,
          liquidation_price: 18.5,
          open_close: "Close",
          open_time: new Date("2024-06-29T14:00:00.000Z"),
          close_time: new Date("2024-06-29T16:30:00.000Z"),
          pnl: -150.25,
          accrued_funding: -0.03,
          close_reason: "Take Profit",
        },
      
        // Strategy 5 (Closed)
        {
          id: 9,
          strategy_execution_id: "2b4d6f8a-0c2e-4g6h-8i0j-1k3l5m7n9p1q",
          exchange: "Binance",
          symbol: "LINK/USDT",
          side: "Long",
          is_hedge: false,
          size_in_asset: 1000,
          liquidation_price: 5.2,
          open_close: "Close",
          open_time: new Date("2024-06-30T08:00:00.000Z"),
          close_time: new Date("2024-06-30T10:15:00.000Z"),
          pnl: -75.5,
          accrued_funding: 0.02,
          close_reason: "Stop Loss",
        },
        {
          id: 10,
          strategy_execution_id: "2b4d6f8a-0c2e-4g6h-8i0j-1k3l5m7n9p1q",
          exchange: "GMX",
          symbol: "LINK/USDT",
          side: "Short",
          is_hedge: true,
          size_in_asset: 1000,
          liquidation_price: 6.8,
          open_close: "Close",
          open_time: new Date("2024-06-30T08:00:00.000Z"),
          close_time: new Date("2024-06-30T10:15:00.000Z"),
          pnl: 100.25,
          accrued_funding: -0.01,
          close_reason: "Stop Loss",
        },
      ];

    useEffect( () => {
        getTrades();
        return () => {
            // Cleanup
            setTrades([]);
        }
    }, []);

    return (
        <PositionProvider closePosition={closePosition}>
            <Box sx= {{display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <PositionList trades={mockTrades} />
            </Box>
        </PositionProvider>
    )
}

export default PositionMonitor

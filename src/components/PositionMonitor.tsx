import { useEffect, useState } from 'react'
import {Trade} from './TradeMonitorInterface'
import PositionCard from './PositionMonitor/PositionCard';
import { Box } from '@mui/material';
import { PositionProvider } from './PositionMonitor/PositionContext';
import PositionList from './PositionMonitor/PositionList';
// TODO: Allow Sorting of Positions
// TODO: Add Graph componenet to get more financial data related to long and short position

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
          open_close: "Close",
          open_time: new Date("2024-06-26T21:50:37.557Z"),
          close_time: new Date("2024-06-26T21:52:52.708Z"),
          pnl: -1.18613449627169,
          accrued_funding: 0.00359847452959475,
          close_reason: "TEST",
        },
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
          strategy_execution_id: "9q8r7s6t-5u4v-3w2x-1y0z-abcdefghijkl",
          exchange: "Kraken",
          symbol: "ETH/USD",
          side: "Short",
          is_hedge: true,
          size_in_asset: 10,
          liquidation_price: 2200,
          open_close: "Open",
          open_time: new Date("2024-06-27T14:30:00.000Z"),
        },
        {
          id: 5,
          strategy_execution_id: "mnopqrst-uvwx-yz12-3456-789abcdefghi",
          exchange: "Deribit",
          symbol: "SOL/USDT",
          side: "Long",
          is_hedge: false,
          size_in_asset: 500,
          liquidation_price: 15.5,
          open_close: "Close",
          open_time: new Date("2024-06-28T09:45:00.000Z"),
          close_time: new Date("2024-06-28T11:30:00.000Z"),
          pnl: 250.75,
          accrued_funding: 0.05,
          close_reason: "Take Profit",
        }
    ];

    useEffect( () => {
        getTrades();
        console.log()
        return () => {
            var positionMonitor = document.querySelector("PositionMonitor");
            if (positionMonitor) {
                positionMonitor.innerHTML = "";
            }
        }
    }, []);

    return (
        <PositionProvider closePosition={closePosition}>
            <Box sx= {{display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '1em' }}>
                <PositionList trades={mockTrades} />
            </Box>
        </PositionProvider>
    )
}

export default PositionMonitor

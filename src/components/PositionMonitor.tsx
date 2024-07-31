import { useEffect, useState } from 'react'
import {Trade, tradeFields} from './TradeMonitorInterface'

// TODO: Add Search Bar
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
        <div className="PositionMonitor">
            <h1>Trade Positions</h1>
            {/* <PositionCard 
                strategy_execution_id
                /> */}
        </div>
    )
}

export default PositionMonitor

// Archive:
{/* <table>
    <thead>
        <tr>
            { tradeFields.slice(1).map(field => <th>{field}</th>) }
        </tr>
        
    </thead>
    <tbody>
        {trades.map( (trade: Trade) => 
            <tr key={trade.id}>
                <td>{trade.strategy_execution_id}</td>
                <td>{trade.exchange}</td>
                <td>{trade.symbol}</td>
                <td>{trade.side}</td>
                <td>{trade.is_hedge}</td>
                <td>{trade.size_in_asset}</td>
                <td>{trade.liquidation_price}</td>
                <td>{trade.open_close}</td>
                <td>{trade.open_time ? trade.open_time.toLocaleString() : 'N/A'}</td>
                <td>{trade.close_time ? trade.close_time.toLocaleString() : 'N/A'}</td>
                <td>{trade.pnl !== null ? trade.pnl : 'N/A'}</td>
                <td>{trade.accrued_funding !== null ? trade.accrued_funding : 'N/A'}</td>
                <td>{trade.close_reason !== null ? trade.close_reason : 'N/A'}</td>
            </tr>
        )}
    </tbody>
</table> */}
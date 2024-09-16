import React, {createContext, useContext, useEffect, useState, useCallback, useMemo} from 'react'
import {Position} from '../components/Settings/Position'
import { useSocket } from './SocketContext';

interface PositionContextType {
  positions: Position[];
  openPositions: Position[];
  closedPositions: Position[];
  loading: boolean;
  error: string | null;
  closePosition: (id: number) => Promise<void>;
  closePositionPair: (symbol: string) => Promise<void>;
  fetchPositions: () => Promise<void>;
}

const PositionContext = createContext<PositionContextType | undefined>(undefined);

const mockPositions: Position[] = [
  // Open positions
  {
    id: 1,
    strategy_execution_id: 'strat1',
    exchange: 'Binance',
    symbol: 'BTC/USDT',
    side: 'Long',
    is_hedge: false,
    size_in_asset: 0.5,
    liquidation_price: 25000,
    open_close: 'open',
    open_time: new Date('2024-09-15T10:00:00Z'),
  },
  {
    id: 2,
    strategy_execution_id: 'strat1',
    exchange: 'Binance',
    symbol: 'BTC/USDT',
    side: 'Short',
    is_hedge: true,
    size_in_asset: 5,
    liquidation_price: 3000,
    open_close: 'open',
    open_time: new Date('2024-09-15T11:00:00Z'),
  },
  {
    id: 3,
    strategy_execution_id: 'strat2',
    exchange: 'GMX',
    symbol: 'SOL/USD',
    side: 'Long',
    is_hedge: false,
    size_in_asset: 100,
    liquidation_price: 50,
    open_close: 'open',
    open_time: new Date('2024-09-16T09:00:00Z'),
  },
  {
    id: 4,
    strategy_execution_id: 'strat2',
    exchange: 'Bybit',
    symbol: 'SOL/USD',
    side: 'Long',
    is_hedge: false,
    size_in_asset: 1000,
    liquidation_price: 0.4,
    open_close: 'open',
    open_time: new Date('2024-09-16T10:00:00Z'),
  },
  {
    id: 5,
    strategy_execution_id: 'strat3',
    exchange: 'Binance',
    symbol: 'XRP/USD',
    side: 'Short',
    is_hedge: true,
    size_in_asset: 5000,
    liquidation_price: 0.7,
    open_close: 'open',
    open_time: new Date('2024-09-17T14:00:00Z'),
  },
  {
    id: 6,
    strategy_execution_id: 'strat3',
    exchange: 'Synthetix',
    symbol: 'XRP/USD',
    side: 'Long',
    is_hedge: false,
    size_in_asset: 200,
    liquidation_price: 10,
    open_close: 'open',
    open_time: new Date('2024-09-17T15:00:00Z'),
  },
  // Closed positions
  {
    id: 7,
    strategy_execution_id: 'strat4',
    exchange: 'GMX',
    symbol: 'AVAX/USDT',
    side: 'Long',
    is_hedge: false,
    size_in_asset: 300,
    liquidation_price: 5,
    open_close: 'close',
    open_time: new Date('2024-09-10T08:00:00Z'),
    close_time: new Date('2024-09-14T16:00:00Z'),
    pnl: 450.75,
    accrued_funding: -2.5,
    close_reason: 'Take Profit',
  },
  {
    id: 8,
    strategy_execution_id: 'strat4',
    exchange: 'Bybit',
    symbol: 'AVAX/USDT',
    side: 'Short',
    is_hedge: true,
    size_in_asset: 50,
    liquidation_price: 30,
    open_close: 'close',
    open_time: new Date('2024-09-11T09:00:00Z'),
    close_time: new Date('2024-09-14T17:00:00Z'),
    pnl: -120.30,
    accrued_funding: 1.8,
    close_reason: 'Stop Loss',
  },
  {
    id: 9,
    strategy_execution_id: 'strat5',
    exchange: 'Binance',
    symbol: 'MATIC/USD',
    side: 'Long',
    is_hedge: false,
    size_in_asset: 1000,
    liquidation_price: 4,
    open_close: 'close',
    open_time: new Date('2024-09-12T10:00:00Z'),
    close_time: new Date('2024-09-15T11:00:00Z'),
    pnl: 780.50,
    accrued_funding: -5.2,
    close_reason: 'Strategy End',
  },
  {
    id: 10,
    strategy_execution_id: 'strat5',
    exchange: 'Synthetix',
    symbol: 'MATIC/USD',
    side: 'Short',
    is_hedge: true,
    size_in_asset: 2000,
    liquidation_price: 1.2,
    open_close: 'close',
    open_time: new Date('2024-09-13T11:00:00Z'),
    close_time: new Date('2024-09-15T12:00:00Z'),
    pnl: -250.80,
    accrued_funding: 3.7,
    close_reason: 'Manual Close',
  },
];

export const PositionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { socket } = useSocket();

  const fetchPositions = useCallback(async () => {
    setLoading(true);
    try {
      const backendURL = localStorage.getItem('backendURL');
      const response = await fetch(`${backendURL}/trades/all`);
      if (!response.ok) {
        throw new Error('Failed to fetch positions');
      }
      const data = await response.json();
      setPositions(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch positions');
      console.error('Error fetching positions:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // fetchPositions(); TODO: Uncomment this line to fetch positions on component mount
    setPositions(mockPositions);
    console.log('Fetching positions');

    // Set up socket listener for 'trade_logged' event
    if (socket) {
      socket.on('trade_logged', () => {
        fetchPositions();
      });
      socket.on('connect', () => {
        // fetchPositions(); TODO: Uncomment this line to fetch positions on socket connection
        setPositions(mockPositions);

      });
    }

    // Clean up socket listener
    return () => {
      if (socket) {
        socket.off('trade_logged');
      }
    };
  }, [socket, fetchPositions]);

  const closePosition = useCallback(async (id: number) => {
    try {
      const backendURL = localStorage.getItem('backendURL');
      const response = await fetch(`${backendURL}/trades/close/${id}`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to close position');
      }
      // Update the local state instead of fetching all positions again
      setPositions(prevPositions => 
        prevPositions.map(pos => 
          pos.id === id ? { ...pos, open_close: 'close' } : pos
        )
      );
    } catch (err) {
      setError('Failed to close position');
      console.error('Error closing position:', err);
    }
  }, []);

  const closePositionPair = useCallback(async (symbol: string) => {
    try {
      const backendURL = localStorage.getItem('backendURL');
      const response = await fetch(`${backendURL}/close-pair/${symbol}`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to close position pair');
      }
      // Update the local state instead of fetching all positions again
      setPositions(prevPositions => 
        prevPositions.map(pos => 
          pos.symbol === symbol ? { ...pos, open_close: 'close' } : pos
        )
      );
    } catch (error) {
      
    }
  }, []);

  const openPositions = useMemo(() => positions.filter(p => p.open_close === 'open'), [positions]);
  const closedPositions = useMemo(() => positions.filter(p => p.open_close === 'close'), [positions]);

  return (
    <PositionContext.Provider 
      value={{ 
        positions, 
        openPositions, 
        closedPositions, 
        loading, 
        error, 
        closePosition, 
        closePositionPair,
        fetchPositions 
      }}
    >
      {children}
    </PositionContext.Provider>
  );
};

export const usePosition = () => {
  const context = useContext(PositionContext);
  if (!context) {
    throw new Error('usePosition must be used within a PositionProvider');
  }
  return context;
};
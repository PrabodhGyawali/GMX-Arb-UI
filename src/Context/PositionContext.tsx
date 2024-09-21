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
    fetchPositions(); 
    // Set up socket listener for 'trade_logged' event
    if (socket) {
      socket.on('trade_logged', () => {
        fetchPositions();
      });
      socket.on('connect', () => {
        fetchPositions(); 
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
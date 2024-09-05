import {createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type SocketContextType = {
    socket: Socket | null;
    connected: boolean;
    botStatus: BotStatus;
};

enum BotStatus {
    ON,
    STOPPING, 
    PAUSED,
    OFF
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = (): SocketContextType => {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};


interface SocketContextProviderProps {
    children: React.ReactNode;
}
export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [connected, setConnected] = useState(false);
    const [botStatus, setBotStatus] = useState<BotStatus>(BotStatus.OFF);

    useEffect(() => {
        const newSocket = io('http://localhost:5000'); // TODO: Make sure to update for production
        setSocket(newSocket);

        newSocket.on('connect', () => {setConnected(true)});
        newSocket.on('disconnect', () => {setConnected(false)});

        // Get Bot Status
        fetch('/api/bot-status')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setBotStatus(data.status as BotStatus);
            })
            .catch(error => {
                console.error('Error fetching bot status:', error);
            });

        
        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, connected, botStatus}}>
            {children}
        </SocketContext.Provider>
    )
};


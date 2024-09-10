import {createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type SocketContextType = {
    socket: Socket | null;
    connected: boolean;
    botStatus: BotStatus;
    backendUrl: string;
    setBackendUrl: (url: string) => void;
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
    const [backendUrl, setBackendUrl] = useState<string>(() => 
        localStorage.getItem('backendURL') || 'http://localhost:5001'
    );


    useEffect(() => {
        if (socket) {
            socket.disconnect();
        }

        const newSocket = io(backendUrl);
        setSocket(newSocket);

        newSocket.on('connect', () => setConnected(true));
        newSocket.on('disconnect', () => setConnected(false));
        newSocket.on('bot_stopped', () => setBotStatus(BotStatus.OFF));
        newSocket.on('bot_paused', () => setBotStatus(BotStatus.PAUSED));
        newSocket.on('bot_running', () => setBotStatus(BotStatus.ON));

        return () => {
            newSocket.disconnect();
        };
    }, [backendUrl]);

    return (
        <SocketContext.Provider value={{ socket, connected, botStatus, backendUrl, setBackendUrl}}>
            {children}
        </SocketContext.Provider>
    )
};

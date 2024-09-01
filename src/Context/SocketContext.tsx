import {createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type SocketContextType = {
    socket: Socket | null;
    connected: boolean;
};

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
    

    useEffect(() => {
        const newSocket = io('http://localhost:5000'); // TODO: Make sure to update for production
        setSocket(newSocket);

        newSocket.on('connect', () => {setConnected(true)});
        newSocket.on('disconnect', () => {setConnected(false)});

        
        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, connected}}>
            {children}
        </SocketContext.Provider>
    )
};


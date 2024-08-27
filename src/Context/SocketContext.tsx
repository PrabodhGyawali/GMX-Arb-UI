import {createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
enum EventsDirectory {
    CLOSE_ALL_POSITIONS = "close_all_positions",
    CLOSE_POSITION_PAIR = "close_position_pair",
    OPPORTUNITY_FOUND = "opportunity_found",
    POSITION_OPENED = "position_opened",
    POSITION_CLOSED = "position_closed",
    TRADE_LOGGED = "trade_logged"
}

type SocketContextType = {
    socket: Socket | null;
    events: Record<EventsDirectory, any[]>;
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
    const [events, setEvents] = useState<Record<EventsDirectory, any[]>>({
        [EventsDirectory.CLOSE_ALL_POSITIONS]: [],
        [EventsDirectory.CLOSE_POSITION_PAIR]: [],
        [EventsDirectory.OPPORTUNITY_FOUND]: [],
        [EventsDirectory.POSITION_OPENED]: [],
        [EventsDirectory.POSITION_CLOSED]: [],
        [EventsDirectory.TRADE_LOGGED]: []
    });

    useEffect(() => {
        const newSocket = io('http://localhost:5000'); // TODO: Make sure to update for production
        setSocket(newSocket);
        Object.values(EventsDirectory).forEach((event) => {
            newSocket.on(event, (data) => {
                setEvents((prevEvents) => ({
                    ...prevEvents,
                    [event]: [...prevEvents[event as EventsDirectory], data]
                }));
            });
        });
    }, []);

    return (
        <SocketContext.Provider value={useSocket()}>
            {children}
        </SocketContext.Provider>
    )
};


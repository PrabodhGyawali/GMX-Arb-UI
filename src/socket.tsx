import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'http://localhost:5000';

const socket = io(URL);

function useSocket() {
  const [eventLog, setEventLog] = useState<string>("");
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onLogEvent(value: string) {
      setEventLog(value);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('event', onLogEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('event', onLogEvent);
    };
  }, []);

  return { eventLog, isConnected };
}

export default useSocket;

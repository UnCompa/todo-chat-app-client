import React, { createContext, useContext, useEffect, type ReactNode } from 'react';
import type { Socket } from 'socket.io-client';
import { socketManager } from '../lib/socket';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});


export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = React.useState(false);
  const socket = socketManager.getSocket();

  useEffect(() => {
    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    socket?.on('connect', handleConnect);
    socket?.on('disconnect', handleDisconnect);

    return () => {
      socket?.off('connect', handleConnect);
      socket?.off('disconnect', handleDisconnect);
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

  export const useSocketContext = () => useContext(SocketContext);
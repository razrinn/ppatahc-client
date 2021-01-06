import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";

interface InitialState {
  socket: SocketIOClient.Socket | undefined;
}

interface Props {
  userId: string;
}

const SocketContect = React.createContext<InitialState>({
  socket: undefined,
});

export function useSocket() {
  return useContext(SocketContect);
}

export const SocketProvider: React.FC<Props> = ({ userId, children }) => {
  const [socket, setSocket] = useState<SocketIOClient.Socket>();

  useEffect(() => {
    const SOCKET_HOST =
      process.env.REACT_APP_SOCKET_HOST || "http://localhost:5000";
    const newSocket = io(SOCKET_HOST, {
      query: { id: userId },
    });
    if (newSocket) {
      setSocket(newSocket);
    }
    return () => {
      newSocket.close();
    };
  }, [userId]);
  return (
    <SocketContect.Provider value={{ socket }}>
      {children}
    </SocketContect.Provider>
  );
};

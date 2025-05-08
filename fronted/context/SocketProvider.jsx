import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const ENDPOINT = "http://localhost:3000/";

const SocketProvider = ({ children }) => {
  // const [Socket, setSocket] = useState(null);
  // let socket;

  // useEffect(() => {
  //   let newSocket = io(ENDPOINT);
  //   socket = newSocket;
  //   setSocket(newSocket);
  //   newSocket.on("connected", (socketID) => {
  //     console.log(socketID);
  //   });
  //   // newSocket.emit("Waiting");

  //   return () => socket?.disconnect(), setSocket(null);
  // }, []);

  return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>;
};

export const SocketState = () => {
  return useContext(SocketContext);
};

export default SocketProvider;

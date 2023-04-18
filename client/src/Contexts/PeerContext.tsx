import React, { createContext } from "react";

interface ISocketContext {
    sendData: (data: string) => void;
}

const SocketContext = createContext<ISocketContext | null>(null);

export default SocketContext;

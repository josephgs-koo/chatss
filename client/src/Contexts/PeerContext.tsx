import React, { createContext } from "react";

interface IPeerContext {
    sendChannel: React.MutableRefObject<RTCDataChannel | undefined>;
}

const PeerContext = createContext<IPeerContext | null>(null);

export default PeerContext;

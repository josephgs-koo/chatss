import React, { createContext, useRef, useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { useSetRecoilState, useRecoilState } from "recoil";
import { msgListSelector } from "../Atom/msgAtom";
import { gameDataSelector, hostSelector } from "../Atom/GameData";

interface ISocketContext {
    socketRef: React.MutableRefObject<Socket | undefined>;
    handleSendMsg: (data: string) => void;
    handleSendGame: (data: any) => void;
}

export const SocketContext = createContext<ISocketContext | null>(null);

const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
    const socketRef = useRef<Socket>();
    const [target, setTatget] = useState<string>();
    const setmsgList = useSetRecoilState(msgListSelector);
    const [chess, setChess] = useRecoilState(gameDataSelector);
    const setIsHost = useSetRecoilState(hostSelector);
    const roomID = useParams();

    useEffect(() => {
        socketRef.current = io(process.env.REACT_APP_WS_HOST);
        socketRef.current.emit("join room", roomID.roomID);

        socketRef.current.on("joined", (payload: { target: string; host: boolean }) => {
            setTatget(payload.target);
            setIsHost(payload.host);
        });

        socketRef.current.on("msg", (payload) => {
            setmsgList([{ me: false, msg: payload.msg }]);
        });

        socketRef.current.on("game", (payload) => {
            const gameCopy = { ...chess };
            gameCopy.move({
                from: payload.sourceSquare,
                to: payload.targetSquare,
                promotion: "q",
            });
            setChess(gameCopy);
        });

        socketRef.current.on("disconnected", () => {});

        socketRef.current.on("room full", () => {
            alert("room is full");
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSendMsg = (data: string) => {
        socketRef.current?.emit("msg", {
            roomID: roomID.roomID,
            msg: data,
        });
    };

    const handleSendGame = (data: any) => {
        socketRef.current?.emit("game", {
            roomID: roomID.roomID,
            chess: data,
        });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const socket = useMemo(() => ({ socketRef, handleSendMsg, handleSendGame }), []);

    return <SocketContext.Provider value={socket}>{!!target && children}</SocketContext.Provider>;
};

export default SocketContextProvider;

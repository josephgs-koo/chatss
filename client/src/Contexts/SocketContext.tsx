import React, { createContext, useRef, useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { useSetRecoilState, useRecoilState } from "recoil";
import { msgListState } from "../Atom/msgAtom";
import { gameDataSelector, hostSelector } from "../Atom/GameData";

import Loading from "../component/parts/Loading";
import useGamePopUp from "../hooks/useGamePopUp";

interface ISocketContext {
    socketRef: React.MutableRefObject<Socket | undefined>;
    handleSendMsg: (data: string) => void;
    handleSendGame: (data: any) => void;
}

export const SocketContext = createContext<ISocketContext | null>(null);

const SocketContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const socketRef = useRef<Socket>();
    const [target, setTatget] = useState<string>();
    const setmsgList = useSetRecoilState(msgListState);
    const [chess, setChess] = useRecoilState(gameDataSelector);
    const setIsHost = useSetRecoilState(hostSelector);
    const setPopUp = useGamePopUp();
    const roomID = useParams();

    useEffect(() => {
        socketRef.current = io(process.env.REACT_APP_WS_HOST);
        socketRef.current.emit("join room", roomID.roomID);

        socketRef.current.on("joined", (payload: { target: string; host: boolean }) => {
            setTatget(payload.target);
            setIsHost(payload.host);
        });

        socketRef.current.on("msg", (payload) => {
            setmsgList((prev) => [{ me: false, msg: payload.msg }, ...prev]);
        });

        socketRef.current.on("game", (payload) => {
            const gameCopy = { ...chess };
            gameCopy.move({
                from: payload.sourceSquare,
                to: payload.targetSquare,
                promotion: "q",
            });
            if (gameCopy.isGameOver()) setPopUp("lose");
            setChess(gameCopy);
        });

        socketRef.current.on("leave", () => {
            setPopUp("leave");
        });

        socketRef.current.on("room full", () => {
            alert("room is full");
        });

        return () => {
            socketRef.current?.emit("leave", roomID.roomID);
            socketRef.current?.disconnect();
        };

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

    return <SocketContext.Provider value={socket}>{!!target ? children : <Loading />}</SocketContext.Provider>;
};

export default SocketContextProvider;

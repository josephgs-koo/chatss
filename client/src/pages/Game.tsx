/** @jsxImportSource @emotion/react */
import React, { useRef, useEffect, useMemo, useState } from "react";
import { css } from "@emotion/react";
import io, { Socket } from "socket.io-client";
import Chat from "../component/chat/Chat";
import Board from "../component/chess/Board";
import SocketContext from "../Contexts/PeerContext";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { msgListSelector } from "../Atom/msgAtom";

const Game: React.FC = () => {
    const socketRef = useRef<Socket>();
    const setmsgList = useSetRecoilState(msgListSelector);
    const roomID = useParams();
    const [target, setTatget] = useState<string>();

    useEffect(() => {
        socketRef.current = io(process.env.REACT_APP_WS_HOST);
        socketRef.current.emit("join room", roomID.roomID);

        socketRef.current.on("joined", (users: string) => {
            setTatget(users);
        });

        socketRef.current.on("msg", (payload) => {
            setmsgList([{ me: false, msg: payload.msg }]);
        });

        socketRef.current.on("room full", () => {
            alert("room is full");
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSendData = (data: string) => {
        socketRef.current?.emit("msg", {
            roomID: roomID.roomID,
            msg: data,
        });
    };

    const sendData = useMemo(() => handleSendData, []);

    return (
        <SocketContext.Provider value={{ sendData }}>
            <section css={section}>
                {!!target && (
                    <>
                        <Board />
                        <Chat />
                    </>
                )}
            </section>
        </SocketContext.Provider>
    );
};

export default Game;

const section = css({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
});

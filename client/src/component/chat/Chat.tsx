/** @jsxImportSource @emotion/react */
// import React, { useEffect, useState, useRef } from "react";
// import { Socket, io } from "socket.io-client";
import { css } from "@emotion/react";
import ChatSend from "./ChatSend";
import ChatView from "./ChatView";

const wrap = css`
    display: flex;
    flex-direction: column;
    width: 90vw;
    flex: 1 1 auto;
    padding: 10px 0;
    max-height: 100vw;
    gap: 10px;
`;

const Chat = () => {
    // const socketRef = useRef<Socket>();
    // const rtcRef = useRef<RTCPeerConnection>();

    // useEffect(() => {}, []);
    return (
        <div css={wrap}>
            <ChatView />
            <ChatSend />
        </div>
    );
};

export default Chat;

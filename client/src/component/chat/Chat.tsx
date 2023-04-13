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
    height: 40%;
    flex: 1 1 auto;
    padding: 10px 0;
    gap: 10px;
`;

const Chat = () => {
    return (
        <div css={wrap}>
            <ChatView />
            <ChatSend />
        </div>
    );
};

export default Chat;

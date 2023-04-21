/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import Chat from "../component/chat/Chat";
import ChessPlaying from "../component/chess/ChessPlaying";
import SocketContextProvider from "../Contexts/SocketContext";

const Game: React.FC = () => {
    return (
        <SocketContextProvider>
            <section css={section}>
                <ChessPlaying />
                <Chat />
            </section>
        </SocketContextProvider>
    );
};

export default Game;

const section = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    @media screen and (min-width: 900px) {
        height: 100%;
    }
`;

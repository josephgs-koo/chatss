/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import Chat from "../component/chat/Chat";
import ChessPlaying from "../component/chess/ChessPlaying";
import SocketContextProvider from "../Contexts/PeerContext";

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

const section = css({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
});

/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import Chat from "./chat/Chat";
import ChessPlaying from "./chess/ChessPlaying";
import SocketContextProvider from "../../Util/Context/PeerContext";

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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    @media screen and (min-width: 932px) {
        height: 90%;
        flex-direction: row;
    }
`;

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import Chat from "../component/chat/Chat";

const section = css({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
});

const board = css({
    width: "90vw",
    height: "90vw",
    minHeight: "90vw",
    boxShadow: "3px 3px 6px #b4b2b2, -3px -3px 6px #fbfbfb, inset -3px -3px 6px #b4b2b2, inset 3px 3px 6px #fbfbfb",
    borderRadius: "1rem",
});

const Game: React.FC = () => {
    return (
        <section css={section}>
            <div css={board}></div>
            <Chat />
        </section>
    );
};

export default Game;

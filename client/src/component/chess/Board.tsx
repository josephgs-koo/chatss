/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";
import { GamePopUpSelector } from "../../Atom/GameData";
import GamePopUp from "./GamePopUp";

interface IBoardProp {
    children: React.ReactNode;
}

const Board: React.FC<IBoardProp> = ({ children }) => {
    const popup = useRecoilValue(GamePopUpSelector);
    return (
        <div css={board}>
            {children}
            {popup.display && <GamePopUp msg={popup.msg}></GamePopUp>}
        </div>
    );
};

export default Board;

const board = css({
    position: "relative",
    width: "90vw",
    maxWidth: "420px",
    height: "90vw",
    maxHeight: "420px",
    padding: "0.7rem",
    boxShadow: "3px 3px 6px #b4b2b2, -3px -3px 6px #fbfbfb, inset -3px -3px 6px #b4b2b2, inset 3px 3px 6px #fbfbfb",
    borderRadius: "1rem",
});

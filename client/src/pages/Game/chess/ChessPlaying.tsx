/** @jsxImportSource @emotion/react */
import React, { useContext, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { css } from "@emotion/react";
import Board from "./Board";
import { PeerContext } from "../../../Util/Context/PeerContext";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { GameStateFamily, gameState } from "../../../store/GameData";
import useGamePopUp from "../../../Util/hooks/useGamePopUp";

const ChessPlaying: React.FC = () => {
    const [chess, setChess] = useRecoilState(GameStateFamily("gameData"));
    const reset = useResetRecoilState(gameState);
    const host = useRecoilValue(GameStateFamily("host"));
    const setPopUp = useGamePopUp();
    const socket = useContext(PeerContext);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => () => resetChess(), []);

    function onDrop(sourceSquare: any, targetSquare: any) {
        if (host === (chess.turn() === "w")) {
            const gameCopy = { ...chess };
            const move = gameCopy.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: "q",
            });
            if (gameCopy.game_over()) setPopUp("win");
            setChess(gameCopy);

            if (move === null) return false;

            socket?.handleSendMsg("game", { sourceSquare, targetSquare });

            return true;
        } else {
            setPopUp("turn");
            setTimeout(() => setPopUp("default"), 1000);
            return false;
        }
    }

    const resetChess = () => {
        reset();
        const gameCopy = { ...chess };
        gameCopy.reset();
        setChess(gameCopy);
    };

    return (
        <Board>
            <div css={wrap}>
                <Chessboard
                    id="chatss"
                    position={chess.fen()}
                    onPieceDrop={onDrop}
                    boardOrientation={host ? "white" : "black"}
                    customDarkSquareStyle={{ backgroundColor: "#686868" }}
                    customLightSquareStyle={{ backgroundColor: "#e8e8e8" }}
                />
            </div>
        </Board>
    );
};

export default ChessPlaying;

const wrap = css`
    width: 100%;
    height: 100%;
    border-radius: 0.7rem;
    overflow: hidden;
`;

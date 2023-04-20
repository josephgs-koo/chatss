/** @jsxImportSource @emotion/react */
import React, { useContext, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { css } from "@emotion/react";
import Board from "./Board";
import { SocketContext } from "../../Contexts/PeerContext";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { gameDataSelector, hostSelector, GamePopUpSelector } from "../../Atom/GameData";
import useGamePopUp from "../../hooks/useGamePopUp";

const ChessPlaying: React.FC = () => {
    const [chess, setChess] = useRecoilState(gameDataSelector);
    const host = useRecoilValue(hostSelector);
    const setPopUp = useGamePopUp();
    const popUpOff = useResetRecoilState(GamePopUpSelector);
    const socket = useContext(SocketContext);

    useEffect(() => {
        console.log(chess.turn());
    });

    function onDrop(sourceSquare: any, targetSquare: any) {
        if (host === (chess.turn() === "w")) {
            const gameCopy = { ...chess };
            const move = gameCopy.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: "q",
            });
            setChess(gameCopy);

            if (move === null) return false;

            socket?.handleSendGame({ sourceSquare, targetSquare });

            return true;
        } else {
            setPopUp("turn");
            setTimeout(popUpOff, 1000);
            return false;
        }
    }

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

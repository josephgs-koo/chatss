/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

const board = css({
    width: "90vw",
    height: "90vw",
    minHeight: "90vw",
    padding: "0.5rem",
    boxShadow: "3px 3px 6px #b4b2b2, -3px -3px 6px #fbfbfb, inset -3px -3px 6px #b4b2b2, inset 3px 3px 6px #fbfbfb",
    borderRadius: "1rem",
});

const wrap = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    border-radius: 0.7rem;
    overflow: hidden;
`;

const squareBlack = css`
    width: calc(100% / 8);
    height: calc(100% / 8);
    background-color: #686868;
`;

const squareWhite = css`
    width: calc(100% / 8);
    height: calc(100% / 8);
    background-color: transparent;
`;

const Board = () => {
    const dummy = [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
    ];

    return (
        <div css={board}>
            <div css={wrap}>
                {dummy.map((x, idx1) => {
                    return x.map((x, idx2) => {
                        const func = () => {
                            if (idx1 % 2 === 0) {
                                return idx2 % 2 === 0;
                            } else {
                                return idx2 % 2 !== 0;
                            }
                        };
                        return <div key={`${idx1}${idx2}`} css={func() ? squareWhite : squareBlack}></div>;
                    });
                })}
            </div>
        </div>
    );
};

export default Board;

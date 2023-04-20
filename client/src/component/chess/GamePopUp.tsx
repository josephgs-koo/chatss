/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import Button from "../parts/Button";

type Props = {
    msg: string;
    btnName?: string;
    btn?: () => void;
};

const GamePopUp: React.FC<Props> = ({ msg, btnName, btn }) => {
    return (
        <div css={popupstyle}>
            <span>{msg}</span>
            {btn && <Button onClick={btn}>{btnName}</Button>}
        </div>
    );
};

export default GamePopUp;

const popupstyle = css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    background-color: rgba(232, 232, 232, 0.8);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    font-weight: 700;

    > span {
        font-size: 2rem;
        color: red;
    }
`;

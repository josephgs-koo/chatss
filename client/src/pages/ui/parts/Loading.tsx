/** @jsxImportSource @emotion/react */
import React from "react";
import { css, keyframes } from "@emotion/react";

const Loading: React.FC = () => {
    return (
        <div
            css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 20px;
            `}
        >
            <span css={loading}></span>
            <span
                css={css`
                    font-size: 2rem;
                    color: #424242;
                `}
            >
                Waiting For Player
            </span>
        </div>
    );
};

export default Loading;

const eyeShade = keyframes`
    0% { transform: translateY(0)}
    20% { transform: translateY(5px)}
    40%, 50% { transform: translateY(-5px)}
    60% { transform: translateY( -8px)}
    75% { transform: translateY( 5px)}
    100% { transform: translateY(10px)}
`;

const eyeMove = keyframes`
    0% { transform: translate(0 , 0)}
    20% { transform: translate(0px , 5px)}
    40%, 50% { transform: translate(0px , -5px)}
    60% { transform: translate(-10px , -5px)}
    75% { transform: translate(-20px , 5px)}
    100% { transform: translate(0 , 10px)}
`;

const loading = css`
    position: relative;
    width: 78px;
    height: 78px;
    border-radius: 50%;
    box-sizing: border-box;
    background: transparent;
    z-index: 10;
    border: 8px solid #424242;
    overflow: hidden;
    box-sizing: border-box;

    &::after {
        content: "";
        position: absolute;
        left: 0;
        top: -50%;
        width: 100%;
        height: 100%;
        background: #424242;
        z-index: 5;
        border-bottom: 8px solid #424242;
        box-sizing: border-box;
        animation: ${eyeShade} 3s infinite;
    }

    &::before {
        content: "";
        position: absolute;
        left: 20px;
        bottom: 15px;
        width: 32px;
        z-index: 2;
        height: 32px;
        background: #686868;
        border-radius: 50%;
        animation: ${eyeMove} 3s infinite;
    }
`;

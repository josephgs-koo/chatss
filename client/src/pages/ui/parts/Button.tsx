/** @jsxImportSource @emotion/react */
import React from "react";
import { SerializedStyles, css } from "@emotion/react";

type Props = {
    onClick: () => void;
    custom?: SerializedStyles;
    children?: React.ReactNode;
};

const Button: React.FC<Props> = ({ onClick, custom, children }) => {
    return (
        <button css={[style, custom]} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;

const style = css`
    min-width: max-content;
    padding: 1rem 1.5rem;
    background-color: #e8e8e8;
    color: #424242;
    border: none;
    border-radius: 9999px;
    box-shadow: 3px 3px 6px #b4b2b2, -3px -3px 6px #fbfbfb, inset -3px -3px 6px #b4b2b2, inset 3px 3px 6px #fbfbfb;
    transition: 0.2s ease-in-out;
    &:active {
        box-shadow: none;
    }
`;

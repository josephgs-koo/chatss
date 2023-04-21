/** @jsxImportSource @emotion/react */
import React from "react";
import { SerializedStyles, css } from "@emotion/react";

interface IInputProp {
    title: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    custom?: SerializedStyles;
    onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const BasicInput: React.FC<IInputProp> = ({ title, placeholder, custom, value, onChange, onKeyUp }) => {
    return (
        <div css={[inputWrap, custom]}>
            <input
                type="text"
                css={inputStyle}
                value={value}
                placeholder={placeholder}
                id={title}
                onChange={onChange}
                onKeyUp={onKeyUp}
            />
        </div>
    );
};

export default BasicInput;

const inputWrap = css({
    width: "100%",
    padding: "0.7rem 1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
    boxShadow: "3px 3px 6px #b4b2b2, -3px -3px 6px #fbfbfb, inset -3px -3px 6px #b4b2b2, inset 3px 3px 6px #fbfbfb",
    transition: ".2s ease-in-out",
    border: "0px solid rgba(0,0,0,0)",

    "&:focus-within": {
        boxShadow: "3px 3px 6px #b4b2b2, -3px -3px 6px #fbfbfb, inset -3px -3px 6px #fbfbfb, inset 3px 3px 6px #b4b2b2",
        border: "2px solid rgba(0,0,0,0)",
    },
});

const inputStyle = css({
    flex: "1 1 auto",
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    fontSize: "1rem",
});

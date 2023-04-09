/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";
import { msgSelector } from "../../Atom/msgAtom";

const ChatView = () => {
    const msgList = useRecoilValue(msgSelector);
    console.log(msgList);
    return (
        <div css={wrap}>
            {msgList.map((x, idx) => (
                <div
                    key={idx}
                    css={x.sender === "me" ? msgWrap({ textAlign: "right" }) : msgWrap({ textAlign: "left" })}
                >
                    <span css={msgBlock}>{x.msg}</span>
                </div>
            ))}
        </div>
    );
};

export default ChatView;

const wrap = css`
    display: flex;
    /* flex-direction: column; */
    width: 90vw;
    height: 90%;
    padding: 10px;
    /* display: flex; */
    flex-direction: column-reverse;
    gap: 10px;
    overflow-y: scroll;
    border-radius: 1rem;
    box-shadow: -3px -3px 6px #b4b2b2, 3px 3px 6px #fbfbfb, inset 3px 3px 6px #b4b2b2, inset -3px -3px 6px #fbfbfb;
`;

type MsgWrapType = {
    textAlign: string;
};
const msgWrap = (prop: MsgWrapType) => css`
    width: 100%;
    text-align: ${prop.textAlign};
`;

const msgBlock = css`
    display: inline-block;
    width: fit-content;
    max-width: 70%;
    border-radius: 1000px;
    padding: 0.5rem 1rem;
    box-shadow: 3px 3px 6px #b4b2b2, -3px -3px 6px #fbfbfb, inset -3px -3px 6px #b4b2b2, inset 3px 3px 6px #fbfbfb;
    text-align: center;
`;

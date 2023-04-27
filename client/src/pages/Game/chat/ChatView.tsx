/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";
import { msgListState } from "../../../store/msgAtom";

const ChatView: React.FC = () => {
    const msgList = useRecoilValue(msgListState);

    return (
        <div css={wrap}>
            {msgList.map((x, idx) => (
                <div key={idx} css={x.me ? msgWrap({ textAlign: "right" }) : msgWrap({ textAlign: "left" })}>
                    <span css={msgBlock}>{x.msg}</span>
                </div>
            ))}
        </div>
    );
};

export default ChatView;

const wrap = css`
    display: flex;
    width: 100%;
    height: 90%;
    padding: 10px;
    flex-direction: column-reverse;
    gap: 10px;
    overflow-y: scroll;
    scrollbar-track-color: #e8e8e8;
    scrollbar-color: #8b8b8b transparent;
    scrollbar-width: thin;
    ::-webkit-scrollbar-track {
        background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #8b8b8b;
        border-radius: 1000px;
    }
    ::-webkit-scrollbar {
        background-color: transparent;
        width: 5px;
    }
    border-radius: 1rem;
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
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    box-shadow: 3px 3px 6px #b4b2b2, -3px -3px 6px #fbfbfb, inset -3px -3px 6px #b4b2b2, inset 3px 3px 6px #fbfbfb;
    text-align: left;
    word-break: break-all;
`;

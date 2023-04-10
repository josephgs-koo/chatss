/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import { useSetRecoilState } from "recoil";
import { msgListSelector } from "../../Atom/msgAtom";
import BasicInput from "../parts/BasicInput";
import Button from "../parts/Button";
import { TbSend } from "react-icons/tb";

const ChatSend = () => {
    const [msg, setMsg] = useState<string>("");
    const setmsgList = useSetRecoilState(msgListSelector);

    const handleSubmit = () => {
        if (msg.length > 0) {
            setmsgList([{ sender: "me", msg: msg }]);
            setMsg("");
        }
    };

    return (
        <div css={wrap}>
            <BasicInput
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Text"
                title="chatMsg"
                custom={customInputStyle}
            ></BasicInput>
            <Button onClick={handleSubmit} custom={css({ padding: "0 1rem" })}>
                <TbSend css={css({ fontSize: "1.5rem" })} />
            </Button>
        </div>
    );
};

export default ChatSend;

const wrap = css`
    width: 100%;
    display: flex;
    gap: 10px;
`;

const customInputStyle = css`
    width: 80%;
`;

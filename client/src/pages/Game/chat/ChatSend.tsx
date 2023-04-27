/** @jsxImportSource @emotion/react */
import React, { useState, useContext } from "react";
import { SocketContext } from "../Contexts/SocketContext";
import { css } from "@emotion/react";
import { useSetRecoilState } from "recoil";
import { msgListState } from "../../../store/msgAtom";
import BasicInput from "../../ui/parts/BasicInput";
import Button from "../../ui/parts/Button";
import { TbSend } from "react-icons/tb";

const ChatSend: React.FC = () => {
    const [msg, setMsg] = useState<string>("");
    const setmsgList = useSetRecoilState(msgListState);
    const socket = useContext(SocketContext);

    const handleSubmit = () => {
        if (msg.length > 0) {
            socket?.handleSendMsg("msg", msg);
            setmsgList((prev) => [{ me: true, msg: msg }, ...prev]);
            setMsg("");
        }
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSubmit();
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
                onKeyUp={handleKeyUp}
            />
            <Button onClick={handleSubmit} custom={css({ padding: ".5rem 1rem" })}>
                <TbSend css={css({ fontSize: "1.5rem" })} />
            </Button>
        </div>
    );
};

export default ChatSend;

const wrap = css`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 3.1rem;
    display: flex;
    gap: 10px;
`;

const customInputStyle = css`
    width: 80%;
`;

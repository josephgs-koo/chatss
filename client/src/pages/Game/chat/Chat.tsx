/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ChatSend from "./ChatSend";
import ChatView from "./ChatView";
import { useResetRecoilState } from "recoil";
import { msgListState } from "../../../store/msgAtom";
import { useEffect } from "react";

const Chat: React.FC = () => {
    const resetMsgList = useResetRecoilState(msgListState);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => resetMsgList, []);

    return (
        <div css={wrap}>
            <ChatView />
            <ChatSend />
        </div>
    );
};

export default Chat;

const wrap = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 420px;
    height: 35%;
    max-height: 500px;
    flex: 1 1 auto;
    padding: 10px 0;
    gap: 10px;
    @media screen and (min-width: 932px) {
        height: 430px;
    }
`;

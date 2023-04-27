/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const GameList: React.FC = () => {
    const [list, setList] = useState<{ roomID: string; member: string[] }[]>();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_WS_HOST}/list`)
            .then((res) => res.json())
            .then((data) => setList(data))
            .catch((err) => console.log(err));
    }, []);

    const handleEnterRoom = (e: React.MouseEvent<HTMLDivElement>, x: { roomID: string; member: string[] }) => {
        if (x.member.length < 2) navigate(`/game/${x.roomID}`);
    };

    return (
        <div css={wrap}>
            <div css={innerWrap}>
                {!!list &&
                    list.map((x) => {
                        return (
                            <div onClick={(e) => handleEnterRoom(e, x)} css={room(x.member.length)} key={x.roomID}>
                                <span>{x.roomID}</span>
                                <div css={memberOfRoom}>
                                    {x.member.length === 2 && <FaLock color="#424242" />}
                                    <span>{x.member.length} / 2</span>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default GameList;

const wrap = css({
    width: "100%",
    height: "100%",
    overflow: "auto",
    paddingTop: "10px",
});

const memberOfRoom = css`
    width: 4rem;
    display: flex;
    justify-content: space-around;
`;

const innerWrap = css`
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-end;
    align-items: center;
    gap: 15px;
`;

const room = (prop: number) =>
    css({
        width: "95%",
        height: "3rem",
        display: "flex",
        flexShrink: "0",
        justifyContent: "space-between",
        padding: "1rem",
        alignItems: "center",
        backgroundColor: "#e8e8e8",
        boxShadow:
            prop < 2
                ? "3px 3px 6px #b4b2b2, -3px -3px 6px #fbfbfb, inset -3px -3px 6px #b4b2b2, inset 3px 3px 6px #fbfbfb"
                : "-3px -3px 6px #b4b2b2, 3px 3px 6px #fbfbfb, inset 3px 3px 6px #b4b2b2, inset -3px -3px 6px #fbfbfb",
        borderRadius: "1rem",
        transition: "ease-in-out .3s",
        ":active": {
            boxShadow:
                prop < 2
                    ? "none"
                    : "-3px -3px 6px #b4b2b2, 3px 3px 6px #fbfbfb, inset 3px 3px 6px #b4b2b2, inset -3px -3px 6px #fbfbfb",
        },
    });

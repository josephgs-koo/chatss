/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

type Props = {};

const GameList = (props: Props) => {
    const [list, setList] = useState<{ roomID: string; member: string[] }[]>();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_WS_HOST}/list`)
            .then((res) => res.json())
            .then((data) => setList(data));
    });

    const handleEnterRoom = (x: { roomID: string; member: string[] }) => {
        if (x.member.length < 2) navigate(`/game/${x.roomID}`);
    };

    return (
        <div css={wrap}>
            {list &&
                list.map((x) => {
                    return (
                        <div onClick={() => handleEnterRoom(x)} css={room(x.member.length)} key={x.roomID}>
                            {x.roomID}
                        </div>
                    );
                })}
        </div>
    );
};

export default GameList;

const wrap = css({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "10px",
    overflow: "scroll",
});

const room = (prop: number) =>
    css({
        width: "95%",
        height: "2.5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: prop < 2 ? "#e8e8e8" : "#999999",
        boxShadow:
            prop < 2
                ? "3px 3px 6px #b4b2b2, -3px -3px 6px #fbfbfb, inset -3px -3px 6px #b4b2b2, inset 3px 3px 6px #fbfbfb"
                : "none",
        borderRadius: ".5rem",
        transition: "ease-in-out 1s",
        ":active": {
            boxShadow: "none",
        },
    });

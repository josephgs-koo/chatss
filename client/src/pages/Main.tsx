/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import BasicInput from "../component/parts/BasicInput";

const wrap = css({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
});

const Main: React.FC = () => {
    const [value, setValue] = useState({
        roomName: "",
    });

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({
            ...value,
            [e.target.id]: e.target.value,
        });
    };

    return (
        <div css={wrap}>
            <BasicInput value={value.roomName} onChange={handleValueChange} title="roomName" placeholder="Room ID" />
        </div>
    );
};

export default Main;

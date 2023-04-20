/** @jsxImportSource @emotion/react */
import { Outlet, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import Button from "./parts/Button";

const MenuLayout = () => {
    const navigate = useNavigate();
    return (
        <>
            <div css={btnWrap}>
                <Button onClick={() => navigate("/")} custom={btnStyle}>
                    Host
                </Button>
                <Button onClick={() => navigate("/gamelist")} custom={btnStyle}>
                    Game List
                </Button>
            </div>
            <div css={content}>
                <Outlet />
            </div>
        </>
    );
};

export default MenuLayout;

const btnWrap = css`
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

const btnStyle = css`
    width: 45%;
`;

const content = css`
    height: calc(100% - 3rem);
    padding: 10px 0;
`;

/** @jsxImportSource @emotion/react */
import { Outlet, useLocation } from "react-router-dom";
import { css } from "@emotion/react";
import Header from "./Header";

const Layout: React.FC = () => {
    const url = useLocation();
    const isInGame = url.pathname.includes("/game/");
    return (
        <>
            <Header isInGame={isInGame} />
            <div css={content(isInGame)}>
                <Outlet />
            </div>
        </>
    );
};

export default Layout;

const content = (isInGame: boolean) => css`
    height: ${isInGame ? "100%" : "calc(100% - 3.5rem)"};
    width: 100%;
    padding: 1rem;
    padding-top: ${isInGame ? "0.5rem" : "4rem"};
    transition: 0.5s ease-in-out;

    @media screen and (min-width: 932px) {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

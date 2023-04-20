/** @jsxImportSource @emotion/react */
import { Outlet } from "react-router-dom";
import { css } from "@emotion/react";
import Header from "./Header";

const Layout: React.FC = () => {
    return (
        <>
            <Header />
            <div css={content}>
                <Outlet />
            </div>
        </>
    );
};

export default Layout;

const content = css({
    height: "calc(100% - 3.5rem)",
    padding: "1rem",
    paddingTop: "0.5rem",
});

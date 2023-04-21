/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import logo from "../esset/logo.svg";

const Header: React.FC = () => {
    return (
        <div css={header}>
            <img src={logo} alt="logo" css={logoStyle} />
        </div>
    );
};

export default Header;

const header = css({
    position: "sticky",
    top: 0,
    left: 0,
    height: "3.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8e8e8",
    // boxShadow: "0px 3px 6px #b4b2b2, inset 0px -3px 6px #b4b2b2",
});

const logoStyle = css({
    height: "70%",
});

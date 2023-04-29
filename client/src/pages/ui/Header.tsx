/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import logo from "../../esset/logo.svg";

const Header: React.FC<{ isInGame: boolean }> = ({ isInGame }) => {
    return (
        <div css={header(isInGame)}>
            <img src={logo} alt="logo" css={[logoStyle]} />
        </div>
    );
};

export default Header;

const header = (isInGame: boolean) =>
    css({
        position: "fixed",
        top: isInGame ? "-3.5rem" : 0,
        left: 0,
        height: "3.5rem",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e8e8e8",
        transition: "0.5s ease-in-out",
        // boxShadow: "0px 3px 6px #b4b2b2, inset 0px -3px 6px #b4b2b2",
    });

const logoStyle = css({
    height: "70%",
});

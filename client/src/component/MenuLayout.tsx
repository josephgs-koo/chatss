/** @jsxImportSource @emotion/react */
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { css } from "@emotion/react";
import Button from "./parts/Button";
import useGamePopUp from "../Util/hooks/useGamePopUp";

const MenuLayout: React.FC = () => {
    const setGamePopUp = useGamePopUp();
    const navigate = useNavigate();
    const param = useParams();

    const handleLeave = () => {
        navigate("/");
        setGamePopUp("default");
    };

    return (
        <div css={wrap}>
            <div css={btnWrap}>
                {!!param.roomID ? (
                    <Button onClick={handleLeave} custom={leaveBtnStyle}>
                        Leave Game
                    </Button>
                ) : (
                    <>
                        <Button onClick={() => navigate("/")} custom={btnStyle}>
                            Host
                        </Button>
                        <Button onClick={() => navigate("/gamelist")} custom={btnStyle}>
                            Game List
                        </Button>
                    </>
                )}
            </div>
            <div css={content}>
                <Outlet />
            </div>
        </div>
    );
};

export default MenuLayout;

const wrap = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    @media screen and (min-width: 932px) {
        width: 900px;
        height: 90%;
        max-height: 600px;
        min-height: fit-content;
        box-shadow: 3px 3px 6px #b4b2b2, -3px -3px 6px #fbfbfb, inset -3px -3px 6px #b4b2b2, inset 3px 3px 6px #fbfbfb;
        padding: 1rem;
        border-radius: 1rem;
    }
`;

const btnWrap = css`
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

const btnStyle = css`
    width: 45%;
    font-size: 1rem;
    padding: 0.8rem;
`;

const leaveBtnStyle = css`
    ${btnStyle};
    @media screen and (max-width: 932px) {
        width: 90vw;
    }
`;

const content = css`
    width: 100%;
    height: calc(100% - 3rem);
    padding: 10px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

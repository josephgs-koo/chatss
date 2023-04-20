import { useResetRecoilState, useSetRecoilState } from "recoil";
import { GamePopUpSelector } from "../Atom/GameData";
import { IGamePopUp } from "../Model/types";
import { useNavigate } from "react-router-dom";

const useGamePopUp = () => {
    const setState = useSetRecoilState(GamePopUpSelector);
    const resetPopUp = useResetRecoilState(GamePopUpSelector);
    const navigate = useNavigate();

    type typeKey = "turn" | "win" | "lose";
    const popUpType: { [key: string]: () => IGamePopUp } = {
        turn: () => ({
            msg: "Not Your Turn",
            display: true,
        }),
        win: () => ({
            msg: "You Win",
            display: true,
            btnName: "Back to Lobby",
            btn: () => {
                resetPopUp();
                navigate("/");
            },
        }),
        lose: () => ({
            msg: "You Lose",
            display: true,
            btnName: "Back to Lobby",
            btn: () => {
                resetPopUp();
                navigate("/");
            },
        }),
    };

    const setPopUp = (popUpTypeKey: typeKey) => {
        setState(popUpType[popUpTypeKey]);
    };

    return setPopUp;
};

export default useGamePopUp;

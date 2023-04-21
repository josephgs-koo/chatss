import { useSetRecoilState } from "recoil";
import { GamePopUpSelector } from "../Atom/GameData";
import { IGamePopUp } from "../Model/types";

const useGamePopUp = () => {
    const setState = useSetRecoilState(GamePopUpSelector);

    type typeKey = "default" | "turn" | "win" | "lose" | "leave";
    const popUpType: { [key: string]: () => IGamePopUp } = {
        default: () => ({
            display: false,
            msg: "",
        }),
        turn: () => ({
            msg: "Not Your Turn",
            display: true,
        }),
        win: () => ({
            msg: "You Win",
            display: true,
        }),
        lose: () => ({
            msg: "You Lose",
            display: true,
        }),
        leave: () => ({
            msg: "Player Leave The Game",
            display: true,
        }),
    };

    const setPopUp = (popUpTypeKey: typeKey) => {
        setState(popUpType[popUpTypeKey]);
    };

    return setPopUp;
};

export default useGamePopUp;

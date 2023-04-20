import { DefaultValue, atom, selector } from "recoil";
import { IGameData } from "../Model/types";
const Chess = require("chess.js");

export const gameState = atom<IGameData>({
    key: "GameState",
    default: {
        isOver: false,
        gameData: new Chess(),
        host: false,
        popUp: {
            display: false,
            msg: "",
            btnName: "",
            btn: () => {},
        },
    },
});

export const gameDataSelector = selector({
    key: "GameDataSelector",
    get: ({ get }) => {
        return get(gameState).gameData;
    },
    set: ({ get, set }, gameData) => {
        set(gameState, { ...get(gameState), gameData });
    },
});

export const hostSelector = selector({
    key: "isHost",
    get: ({ get }) => {
        return get(gameState).host;
    },
    set: ({ get, set }, host) => {
        const result = host instanceof DefaultValue ? host : { ...get(gameState), host };
        set(gameState, result);
    },
});

export const GamePopUpSelector = selector({
    key: "gamePopUp",
    get: ({ get }) => {
        return get(gameState).popUp;
    },
    set: ({ get, set }, popUp) => {
        const result = popUp instanceof DefaultValue ? popUp : { ...get(gameState), popUp };
        set(gameState, result);
    },
});

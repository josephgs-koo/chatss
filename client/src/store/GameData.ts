import { atom, selectorFamily } from "recoil";
import { IGameData } from "../Util/Model/types";
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
        },
    },
});

type param = "isOver" | "gameData" | "host" | "popUp";

export const GameStateFamily = selectorFamily<any, param>({
    key: "gameStateFamily",
    get:
        (param) =>
        ({ get }) => {
            const state = get(gameState);
            return state[param];
        },
    set:
        (param) =>
        ({ get, set }, data) => {
            set(gameState, { ...get(gameState), [param]: data });
        },
});

import { atom } from "recoil";
import { IMessageInterface } from "../Model/types";

export const msgListState = atom<IMessageInterface[]>({
    key: "msgAtom",
    default: [],
});

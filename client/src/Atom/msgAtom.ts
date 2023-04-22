import { atom } from "recoil";
import { IMessageInterface } from "../esset/Model/types";

export const msgListState = atom<IMessageInterface[]>({
    key: "msgAtom",
    default: [],
});

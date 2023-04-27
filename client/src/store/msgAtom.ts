import { atom } from "recoil";
import { IMessageInterface } from "../Util/Model/types";

export const msgListState = atom<IMessageInterface[]>({
    key: "msgAtom",
    default: [],
});

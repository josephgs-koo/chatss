import { atom, selector } from "recoil";
import { IMessageInterface } from "../Model/types";
import { DefaultValue } from "recoil";

export const msgListState = atom<IMessageInterface[]>({
    key: "msgAtom",
    default: [],
});

export const msgListSelector = selector<IMessageInterface[]>({
    key: "msgSelector",
    get: ({ get }) => {
        const result = get(msgListState);
        return result;
    },
    set: ({ get, set }, newValue) => {
        const prev = get(msgListState);
        const result = newValue instanceof DefaultValue ? newValue : [...newValue, ...prev];
        set(msgListState, result);
    },
});

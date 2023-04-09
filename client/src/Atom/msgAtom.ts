import { atom, selector } from "recoil";
import { IMessageInterface } from "../Model/types";
import { DefaultValue } from "recoil";

export const msgAtom = atom<IMessageInterface[]>({
    key: "msgAtom",
    default: [],
});

export const msgSelector = selector<IMessageInterface[]>({
    key: "msgSelector",
    get: ({ get }) => {
        const result = get(msgAtom);
        return result;
    },
    set({ get, set }, newValue) {
        const prev = get(msgAtom);
        const result = newValue instanceof DefaultValue ? newValue : [...newValue, ...prev];
        set(msgAtom, result);
    },
});

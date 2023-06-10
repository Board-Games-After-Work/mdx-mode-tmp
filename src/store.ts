import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import toml from "toml";
import { newAdventure } from "./utils";

export const adventuresA = atomWithStorage("adventures", [] as Adventure[]);

const __nowAdventureA__ = atom(null as Adventure | null);

export const nowAdventureA = atom(
    (get) => get(__nowAdventureA__),
    async (_get, set, val?: Adventure) => {
        if (val === undefined) {
            set(__nowAdventureA__, await newAdventure());
        } else {
            set(__nowAdventureA__, () => val);
        }
    }
);

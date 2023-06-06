import { atom } from "jotai";
import toml from "toml";

const __nowAdventureA__ = atom({
    name: "示例冒险",
    players: [],
    itemsQueuesVec: {},
    shops: {},
} as Adventure);

export const nowAdventureA = atom(
    (get) => get(__nowAdventureA__),
    async (get, set, val?: Adventure) => {
        if (val === undefined) {
            let adventureTmp = get(__nowAdventureA__);

            adventureTmp.itemsQueuesVec = toml.parse(
                await (await fetch("/treasuresQueueVec.toml")).text()
            );
            adventureTmp.shops = toml.parse(
                await (await fetch("/shopGoodsVec.toml")).text()
            );

            set(__nowAdventureA__, adventureTmp);
        } else {
            set(__nowAdventureA__, () => val);
        }
    }
);

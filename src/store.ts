import { atom } from "jotai";
import toml from "toml";

const __nowAdventureA__ = atom(null as Adventure | null);

export const nowAdventureA = atom(
    (get) => get(__nowAdventureA__),
    async (_get, set, val?: Adventure) => {
        if (val === undefined) {
            let adventureTmp = {
                name: "示例冒险",
                players: [],
                itemsQueuesVec: {},
                shops: {},
                tasks: {}
            } as Adventure;

            adventureTmp.itemsQueuesVec = toml.parse(
                await (await fetch("/treasuresQueueVec.toml")).text()
            );

            adventureTmp.shops = toml.parse(
                await (await fetch("/shopGoodsVec.toml")).text()
            );

            adventureTmp.tasks = toml.parse(
                await (await fetch("/TasksVec.toml")).text()
            );

            set(__nowAdventureA__, adventureTmp);
        } else {
            set(__nowAdventureA__, () => val);
        }
    }
);

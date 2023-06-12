import toml from "toml";

export const newAdventure = async (): Promise<Adventure> => {
    let adventureTmp = {
        name: "示例冒险",
        history: {
            page: "/",
        },
        players: [],
        itemsQueuesVec: {},
        shops: {},
        tasks: {},
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

    return adventureTmp;
};

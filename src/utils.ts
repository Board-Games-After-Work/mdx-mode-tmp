import { type } from "os";
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

export namespace Tree {
    export type TreeNode<T> = {
        value?: T;
        lv: number;
        children: TreeNode<T>[];
    };

    export const fold = <T>(vec: [value: T, level: number][]) => {
        const ans = (() => {
            const [value] = vec.shift() ?? [undefined];
            if (value) return { value, lv: 1, children: [] } as TreeNode<T>;
            else return undefined;
        })();

        if (!ans) return;

        const nodeStack = [ans] as TreeNode<T>[];

        const pushSameLevel = (node: TreeNode<T>) => {
            nodeStack[nodeStack.length - 1].children.push(node);
            nodeStack.push(node);
        };

        const f = ([v, lv]: [T, number]): void => {
            if (lv === nodeStack.length) {
                nodeStack.pop();

                const thisNode = {
                    value: v,
                    lv,
                    children: [],
                } as TreeNode<T>;

                pushSameLevel(thisNode);
            } else if (lv > nodeStack.length) {
                while (lv > nodeStack.length + 1) {
                    const thisNode = {
                        lv: nodeStack.length + 1,
                        children: [],
                    } as TreeNode<T>;

                    pushSameLevel(thisNode);
                }

                const thisNode = {
                    value: v,
                    lv,
                    children: [],
                } as TreeNode<T>;

                pushSameLevel(thisNode);
            } else {
                while (lv < nodeStack.length) {
                    nodeStack.pop();
                }

                const thisNode = {
                    value: v,
                    lv,
                    children: [],
                } as TreeNode<T>;

                pushSameLevel(thisNode);
            }
        };

        vec.forEach(f);

        return nodeStack[0];
    };
}

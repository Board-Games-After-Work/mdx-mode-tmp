type Tag = [string] | [string, string];

interface Item {
    name: string;
    introduce?: string;
    check?: boolean;
    tags: Tag[];
}

interface Goods {
    item: Item;
    price: number;
    inventory?: number;
    per?: "string";
}

interface TaskCheckPoint {
    name: string;
    check?: boolean;
    introduce?: string;
}

interface Adventure {
    name: string;
    history: {
        page: string;
        header?: string;
        image?: string;
    };
    players: Item[];
    itemsQueuesVec: {
        [key: string]: { items: Item[]; desserts: Item[] };
        activeStep?: number;
    };
    shops: { [key: string]: Goods[] };
    tasks: {
        [key: string]: {
            introduce?: string;
            checkPoints: TaskCheckPoint[];
        };
    };
}

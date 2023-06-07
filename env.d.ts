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

interface MissionsCheckPoint {
    name: string;
    check?: boolean;
    introduce?: string;
}

interface Adventure {
    name: string;
    players: Item[];
    itemsQueuesVec: {
        [key: string]: { items: Item[]; desserts: Item[] };
        activeStep?: number;
    };
    shops: { [key: string]: Goods[] };
    missions: {
        [key: string]: {
            introduce?: string;
            checkPoints: MissionsCheckPoint[];
        };
    };
}

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
}[]

interface Adventure {
    name: string;
    players: Item[];
    itemsQueuesVec: {
        [key: string]: { items: Item[]; desserts: Item[] };
        activeStep?: number;
    };
    shops: { [key: string]: Goods };
}

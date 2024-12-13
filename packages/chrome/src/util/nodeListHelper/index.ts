
export const filter = (
    list: NodeListOf<Node> | HTMLCollectionOf<Element>,
    predicate: (search: Node | Element, index?: number) => boolean,
    ...args: any
) => Array.prototype.filter.call(list, predicate, args);

export const find = (
    list: NodeListOf<Node> | HTMLCollectionOf<Element>,
    predicate: (search: Node | Element, index?: number) => boolean,
    ...args: any
) => Array.prototype.find.call(list, predicate, args);

export const forEach = (
    list: NodeListOf<Node> | HTMLCollectionOf<Element>,
    predicate: (search: Node | Element, index?: number) => void,
    ...args: any
) => Array.prototype.forEach.call(list, predicate, args);

export const map = (
    list: NodeListOf<Node> | HTMLCollectionOf<Element>,
    predicate: (search: Node | Element, index?: number) => any,
    ...args: any
) => Array.prototype.map.call(list, predicate, args);

import {forEach} from "../../../util/nodeListHelper";

export const closeAllCollapses = (collapses: NodeListOf<HTMLElement>) => {
    forEach(collapses, (collapse: HTMLElement) => collapse.removeAttribute('isOpen'))
}
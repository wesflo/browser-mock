import {forEach} from "../../../util/nodeListHelper";

export const openAllCollapses = (collapses: NodeListOf<HTMLElement>) => {
    forEach(collapses, (collapse: HTMLElement) => collapse.setAttribute('isOpen', ''))
}

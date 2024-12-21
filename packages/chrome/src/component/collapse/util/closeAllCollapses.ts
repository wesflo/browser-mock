import {forEach} from "../../../util/nodeListHelper";
import Component from "../index";

export const closeAllCollapses = (collapses: NodeListOf<Component>) => {
    forEach(collapses, (collapse: Component) => collapse.removeAttribute('isOpen'))
}
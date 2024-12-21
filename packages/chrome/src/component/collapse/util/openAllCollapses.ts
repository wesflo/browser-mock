import {forEach} from "../../../util/nodeListHelper";
import Component from "../index";

export const openAllCollapses = (collapses: NodeListOf<Component>) => {
    forEach(collapses, (collapse: Component) => collapse.setAttribute('isOpen', ''))
}

import {forEach} from "../../../util/nodeListHelper";
import Component from "../index";

export const resizeCollapses = (collapses: NodeListOf<Component>) => {
    forEach(collapses, (collapse: Component) => collapse.hasAttribute('isOpen') && collapse.requestUpdate())
}

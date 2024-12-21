import {forEach} from "../../../util/nodeListHelper";
import Component from "../index";

export const openOnlyOneCollapse = (collapses: NodeListOf<Component>, openId) => {
    forEach(collapses, (collapse: Component) => collapse.id !== openId && collapse.removeAttribute('isOpen'))
}
import {forEach} from "../../../util/nodeListHelper";

export const openOnlyOneCollapse = (collapses, openId) => {
    forEach(collapses, (collapse: HTMLElement) => collapse.id !== openId && collapse.removeAttribute('isOpen'))
}
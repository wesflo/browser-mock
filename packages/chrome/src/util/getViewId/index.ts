import {getStorageItem} from "../storage";
import {STORAGE_VIEW} from "../../constant";
import {TLvl} from "../../interface";

export const getViewId =  (lvl: TLvl) => {
    const obj = getStorageItem(STORAGE_VIEW);

    return obj?.[lvl] || null;
}


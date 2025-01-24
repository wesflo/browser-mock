import {getStorageItem} from "../storage";
import {STORAGE_VIEW} from "../../constant";
import {TLvl} from "../../interface";

export const getViewId = async (lvl: TLvl) => {
    const obj = await getStorageItem(STORAGE_VIEW);

    return obj?.[lvl] || null;
}


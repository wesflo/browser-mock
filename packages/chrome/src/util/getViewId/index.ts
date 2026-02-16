import {getStorageItem} from "../storage";
import {STORAGE_VIEW} from "../../constant";

export const getViewId =  () => {
    return getStorageItem(STORAGE_VIEW, null);
}


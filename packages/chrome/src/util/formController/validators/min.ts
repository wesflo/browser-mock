import {TCheckFn} from "../interface";

export const min: TCheckFn = (value, item) => {
    const min = item.getAttribute('min-length');
    return value >= min;
};
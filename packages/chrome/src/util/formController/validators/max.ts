import {TCheckFn} from "../interface";

export const max: TCheckFn = (value, item) => {
    const max = item.getAttribute('max');
    return value <= max;
};
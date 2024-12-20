import {TCheckFn} from "../interface";

export const minLength: TCheckFn = (value, item) => {
    const min = item.getAttribute('min-length');
    return String(value).trim().length >= min;
};
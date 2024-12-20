import {TCheckFn} from "../interface";

export const maxLength: TCheckFn = (value, item) => {
    const max = item.getAttribute('max-length');
    return String(value).trim().length <= max;
};
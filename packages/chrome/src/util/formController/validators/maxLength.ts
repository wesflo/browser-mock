import {TCheckFn} from "../interface";

export const maxLength: TCheckFn = (value: string, item: HTMLElement, ...args: any) => {
    const max = item.getAttribute('max-length');
    return String(value).trim().length <= Number(max);
};
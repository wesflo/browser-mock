import {TCheckFn} from "../interface";

export const minLength: TCheckFn = (value: string, item: HTMLElement, ...args: any) => {
    const min = item.getAttribute('min-length');
    return String(value).trim().length >= Number(min);
};
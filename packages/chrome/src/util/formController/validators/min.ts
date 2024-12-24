import {TCheckFn} from "../interface";

export const min: TCheckFn = (value: string, item: HTMLElement, ...args: any) => {
    const min = item.getAttribute('min-length');
    return Number(value) >= Number(min);
};
import {TCheckFn} from "../interface";

export const max: TCheckFn = (value: string, item: HTMLElement, ...args: any) => {
    const max = item.getAttribute('max');
    return Number(value) <=  Number(max);
};
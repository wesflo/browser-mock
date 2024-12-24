import {TCheckFn} from "../interface";

export const regex: TCheckFn = (value: string, item: HTMLElement, regex: RegExp) => regex.test(value);

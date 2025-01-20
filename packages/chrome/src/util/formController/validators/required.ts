import {TCheckFn} from "../interface";

export const required: TCheckFn = (value: string, ...args: any) => !!String(value).trim().length;

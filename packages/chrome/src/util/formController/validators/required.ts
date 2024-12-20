import {TCheckFn} from "../interface";

export const required: TCheckFn = (value) => !!String(value).trim().length;

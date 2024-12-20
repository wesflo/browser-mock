import {TCheckFn} from "../interface";

export const regex: TCheckFn = (value, item, regex: RegExp) => regex.test(value);

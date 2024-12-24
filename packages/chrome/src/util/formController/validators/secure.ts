import {TCheckFn} from "../interface";

export const secure: TCheckFn = (value: string, ...args: any) => /=|<|>|&|\\|(java[\s\S]*?script)/igm.test(value);

import {TCheckFn} from "../interface";

export const secure: TCheckFn = (value) => /=|<|>|&|\\|(java[\s\S]*?script)/igm.test(value);

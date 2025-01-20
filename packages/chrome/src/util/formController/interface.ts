
export type TCheckFn = (value: unknown, item: HTMLElement, ...args: unknown[]) => boolean

export interface ICheckObj {
    fn: TCheckFn;
    errorMsg?: string;
    [key: string]: unknown;
}

export type TChecks = {
    [k: string]: (TCheckFn | ICheckObj)[];
}

export type TDefaultCheckAttributes = ('required' | 'min' | 'max' | 'minLength' | 'maxLength')[];

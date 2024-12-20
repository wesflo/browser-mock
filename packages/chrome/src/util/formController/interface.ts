
export type TCheckFn = (value: unknown, item: HTMLElement, ...args: unknown) => boolean
export type TChecks = (TCheckFn | ICheckObj)[];

export interface ICheckObj {
    fn: TCheckFn;
    errorMsg?: string;
    [key: string]: unknown;
}

export interface IChecks<T> {
    [key: keyof Partial<T>]: TChecks;
}
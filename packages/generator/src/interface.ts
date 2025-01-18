import {SchemasObject} from "openapi3-ts/oas30";

export type TResponses = {
    path: string;
    method: string;
    status: number;
    mock?: any;
    schema?: SchemasObject;
    example?: any;
    examples?: any;
}

export type TMappingType = 'number' | 'string' | 'paragraph' | 'image' | 'enum' | 'currency';


export interface IMappingObjBase {
    type: TMappingType;
    value: string|number
    values: (string|number)[]
}
export interface IMappingObjString extends IMappingObjBase {
    length: number;
    minLength: number;
    maxLength: number;
}
export interface IMappingObjNumber extends IMappingObjBase {
    min: number;
    max: number;
}
export interface IMappingObjImage extends IMappingObjBase {
    width: number;
    height: number;
}

export type IMappingObj = IMappingObjBase | IMappingObjString | IMappingObjNumber | IMappingObjImage;

export type TMapping = {
    [key: string]: IMappingObj
}
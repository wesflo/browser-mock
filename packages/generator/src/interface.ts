import {SchemaObject, SchemasObject} from "openapi3-ts/oas30";

export interface WFSchemaObject extends SchemaObject {
    keyPath?: string;
    key?: string;
}

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
    enum: string[];
}
export interface IMappingObjNumber extends IMappingObjBase {
    min: number;
    max: number;
    step: number;
}
export interface IMappingObjImage extends IMappingObjBase {
    width: number;
    height: number;
}

export type IMappingObj = IMappingObjBase | IMappingObjString | IMappingObjNumber | IMappingObjImage;

export type TMapping = {
    [key: string]: IMappingObj
}

export type TPgkConfig = {
    swagger?: string;
    target?: string;
    mapping?: string;
    mappings?: string[];
}


export type TRequestMethod = 'GET' | 'PUT' | 'DELETE' | 'POST' | 'PATCH';

export interface IManifestRequest {
    name?: string;
    url: string;
    method: TRequestMethod;
    response: {
        [key: string]: string;
    }
}
export type TManifestDomains = string[];
export interface IManifest {
    domains: TManifestDomains;
    requests: IManifestRequest[];
}

export interface IPromptOptions {
    swaggerPath: string;
    mappingPath: string | string[];
    mockTargetPath: string ;
    responsePath: string;
    responseMethode: string | null;
    responseStatus: string | null;
}
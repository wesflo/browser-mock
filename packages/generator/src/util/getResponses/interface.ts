import {SchemasObject} from "openapi3-ts/oas30";

export type TResponses = {
    path: string;
    method: string;
    status: string;
    mock?: any;
    schema?: SchemasObject;
    example?: any;
    examples?: any;
}
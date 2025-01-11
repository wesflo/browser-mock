import {SchemaObject} from "openapi3-ts/oas30";

export const getMinCount = ({minItems}: SchemaObject): number => {
    return minItems || 0;
}
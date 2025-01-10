import {SchemaObject} from "openapi3-ts/oas30";
import {DataType} from "../../constant";

export const isObject = ( schema: SchemaObject ): boolean => {
    return schema.type === DataType.object || schema.properties !== undefined;
}
import {ReferenceObject, SchemaObject} from "openapi3-ts/oas30";

export type TKey = 'allOf' | 'oneOf' | 'anyOf';
export const isInSchema = (schema: SchemaObject, key: TKey): boolean => schema[key] !== undefined
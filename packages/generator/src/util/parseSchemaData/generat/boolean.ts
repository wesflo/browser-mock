import {SchemaObject} from "openapi3-ts/oas30";

export const generateBoolean = (schema: SchemaObject, chance): any[] => chance.bool()
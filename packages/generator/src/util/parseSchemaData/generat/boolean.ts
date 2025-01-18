import {SchemaObject} from "openapi3-ts/oas30";
import {TMapping} from "../../../interface";

export const generateBoolean = (schema: SchemaObject, mapping: TMapping, chance): any[] => chance.bool()
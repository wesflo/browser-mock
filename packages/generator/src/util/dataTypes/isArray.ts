import { SchemaObject} from "openapi3-ts/oas30";
import {DataType} from "../../constant";

export const isArray = ( schema: SchemaObject): boolean => schema.type === DataType.array
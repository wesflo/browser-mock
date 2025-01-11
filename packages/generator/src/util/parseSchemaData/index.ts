import {SchemaObject} from "openapi3-ts/oas30";
import {GENERATOR_MAP} from "./constant";

export const parseSchemaData = (schema: SchemaObject, chance ): any => {
    const {type} = schema;
    const generator = GENERATOR_MAP[type as string];
    console.log( type )
    return generator ? generator(schema, chance) : null;
}
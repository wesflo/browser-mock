import {SchemaObject} from "openapi3-ts/oas30";
import {GENERATOR_MAP} from "./constant";
import {getOneOf} from "./util/getOneOf";

export const parseSchemaData = (schema: SchemaObject, chance ): any => {
    const {type, oneOf} = schema;

    if(!type && oneOf) {
        const rndSchema = getOneOf(schema, chance);
        console.log(  rndSchema )
        return parseSchemaData(rndSchema, chance);
    }

    const generator = GENERATOR_MAP[type as string];

    return generator ? generator(schema, chance) : null;
}
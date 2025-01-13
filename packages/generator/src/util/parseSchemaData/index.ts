import {SchemaObject} from "openapi3-ts/oas30";
import {GENERATOR_MAP} from "./constant";
import {getOneOf} from "./util/getOneOf";
import {getExample} from "./util/getExample";

export const parseSchemaData = (schema: SchemaObject, chance ): any => {
    const {type, oneOf} = schema;

    if(!type && oneOf) {
        const rndSchema = getOneOf(schema, chance);
        return parseSchemaData(rndSchema, chance);
    }

    const example = getExample(schema, chance);
    if(example) {
        return example;
    }

    const generator = GENERATOR_MAP[type as string];

    return generator ? generator(schema, chance) : null;
}
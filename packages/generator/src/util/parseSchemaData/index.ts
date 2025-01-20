import {GENERATOR_MAP} from "./constant";
import {getOneOf} from "./util/getOneOf";
import {getExample} from "./util/getExample";
import {TMapping, WFSchemaObject} from "../../interface"
import {flattenExample} from "./util/flattenExample";

export const parseSchemaData = (schema: WFSchemaObject, mapping: TMapping, example: object, chance ): any => {
    const {type, oneOf} = schema;

    if(!type && oneOf) {
        const rndSchema = getOneOf(schema, chance);
        return parseSchemaData(rndSchema, mapping, example, chance);
    }

    example = getExample(schema, chance, false) || example;
    const flatExample = flattenExample(example)

    const generator = GENERATOR_MAP[type as string];

    return generator ? generator(schema, mapping, flatExample, chance) : null;
}
import {GENERATOR_MAP} from "./constant";
import {getOneOf} from "./util/getOneOf";
import {getExample} from "./util/getExample";
import {TMapping, WFSchemaObject} from "../../interface"

export const parseSchemaData = (schema: WFSchemaObject, mapping: TMapping, chance ): any => {
    const {type, oneOf} = schema;

    if(!type && oneOf) {
        const rndSchema = getOneOf(schema, chance);
        return parseSchemaData(rndSchema, mapping, chance);
    }

    // const example = getExample(schema, chance);
    // if(example) {
    //     return example;
    // }

    const generator = GENERATOR_MAP[type as string];

    return generator ? generator(schema, mapping, chance) : null;
}
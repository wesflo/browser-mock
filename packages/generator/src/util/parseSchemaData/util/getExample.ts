import {WFSchemaObject} from "../../../interface";

export const getExample = (schema: WFSchemaObject, chance) => {
    if(schema.example) {
        return schema.example;
    }

    if(schema.examples) {
        const keys = Object.keys(schema.examples)
        const index = chance.integer({min: 0, max: keys.length -1});

        return schema.examples[keys[index]];
    }

    return null;
}
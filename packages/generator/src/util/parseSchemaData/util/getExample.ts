import {WFSchemaObject} from "../../../interface";

export const getExample = (schema: WFSchemaObject, chance, getRandom = true) => {
    if(schema.example) {
        return schema.example;
    }

    if(schema.examples) {
        const keys = Object.keys(schema.examples)
        const index = getRandom ? chance.integer({min: 0, max: keys.length -1}) : 0;

        return schema.examples[keys[index]];
    }

    return null;
}
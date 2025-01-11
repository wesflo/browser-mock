import {SchemaObject} from "openapi3-ts/oas30";

export const getExample = (schema: SchemaObject, chance) => {
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
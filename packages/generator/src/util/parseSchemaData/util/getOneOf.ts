import {SchemaObject} from "openapi3-ts/oas30";

export const getOneOf = (schema: SchemaObject, chance): SchemaObject => {
    const {oneOf} = schema;
    const index = chance.integer({max: oneOf.length - 1});

    return oneOf[index] as SchemaObject;
}
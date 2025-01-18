import {WFSchemaObject} from "../../../interface";

export const getOneOf = (schema: WFSchemaObject, chance): WFSchemaObject => {
    const {oneOf} = schema;
    const index = chance.integer({min: 0, max: oneOf.length - 1});

    return oneOf[index] as WFSchemaObject;
}
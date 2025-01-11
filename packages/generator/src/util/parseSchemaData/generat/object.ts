import {SchemaObject} from "openapi3-ts/oas30";
import {parseSchemaData} from "../index";

export const generateObject = (schema: SchemaObject, chance): any => {
    const resp = {}
    const {properties} = schema;

    if(properties) {
        for (let key in properties) {
            resp[key] = parseSchemaData(properties[key] as SchemaObject, chance)
        }
    }

    return resp
}
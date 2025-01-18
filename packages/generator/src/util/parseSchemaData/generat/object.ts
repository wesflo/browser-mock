import {SchemaObject} from "openapi3-ts/oas30";
import {parseSchemaData} from "../index";
import {TMapping} from "../../../interface";

export const generateObject = (schema: SchemaObject, mapping: TMapping, chance): any => {
    const resp = {}
    const {properties} = schema;

    if(properties) {
        for (let key in properties) {
            resp[key] = parseSchemaData(properties[key] as SchemaObject, mapping, chance)
        }
    }

    return resp
}
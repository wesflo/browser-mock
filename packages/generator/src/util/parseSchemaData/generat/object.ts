import {parseSchemaData} from "../index";
import {TMapping, WFSchemaObject} from "../../../interface";
import {getExample} from "../util/getExample";

export const generateObject = (schema: WFSchemaObject, mapping: TMapping, example: object, chance): any => {
    const resp = {}
    const {properties} = schema;

    const {keyPath} = schema

    if(properties) {
        for (let key in properties) {
            const obj: WFSchemaObject = properties[key] as WFSchemaObject;
            obj.key = key;
            obj.keyPath = keyPath ? [keyPath, key].join('.') : key;
            example = getExample(schema, chance, false) || example;

            resp[key] = parseSchemaData(obj as WFSchemaObject, mapping, example, chance)
        }
    }

    return resp
}
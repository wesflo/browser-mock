import {parseSchemaData} from "../index";
import {TMapping, WFSchemaObject} from "../../../interface";

export const generateObject = (schema: WFSchemaObject, mapping: TMapping, chance): any => {
    const resp = {}
    const {properties} = schema;

    const {key: parentKey} = schema

    if(properties) {
        for (let key in properties) {
            const obj: WFSchemaObject = properties[key] as WFSchemaObject;
            obj.key = [parentKey, key].join('.');

            resp[key] = parseSchemaData(obj as WFSchemaObject, mapping, chance)
        }
    }

    return resp
}
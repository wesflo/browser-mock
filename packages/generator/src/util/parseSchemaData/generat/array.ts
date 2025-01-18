import {SchemaObject} from "openapi3-ts/oas30";
import {parseSchemaData} from "../index";
import {getMinCount} from "../util/getMinCount";
import {getMaxCount} from "../util/getMaxCount";
import {TMapping} from "../../../interface";

export const generateArray = (schema: SchemaObject, mapping: TMapping, chance): any[] => {
    const resp = []
    const {items, oneOf} = schema;

    if(items) {
        const countObj = oneOf?.[0] || {};
        let i = getMinCount((countObj as SchemaObject).minItems);
        const l = getMaxCount((countObj as SchemaObject).maxItems, chance);

        for (; i < l; i++) {
            const item = parseSchemaData(items as SchemaObject, mapping, chance);
            resp.push(item)
        }
    }

    return resp
}




import {SchemaObject} from "openapi3-ts/oas30";
import {parseSchemaData} from "../index";
import {getMinCount} from "../util/getMinCount";
import {getMaxCount} from "../util/getMaxCount";

export const generateArray = (schema: SchemaObject, chance): any[] => {
    const resp = []
    const {items, oneOf} = schema;

    if(items) {
        let i = getMinCount(oneOf[0] as SchemaObject);
        const l = getMaxCount(oneOf[0] as SchemaObject, chance);

        for (; i < l; i++) {
            const item = parseSchemaData(items as SchemaObject, chance);
            resp.push(item)
        }
    }

    return resp
}




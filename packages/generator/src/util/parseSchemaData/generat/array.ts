import {parseSchemaData} from "../index";
import {getMinCount} from "../util/getMinCount";
import {getMaxCount} from "../util/getMaxCount";
import {TMapping, WFSchemaObject} from "../../../interface";

export const generateArray = (schema: WFSchemaObject, mapping: TMapping, chance): any[] => {
    const resp = []
    const {items, oneOf} = schema;

    if(items) {
        const countObj = oneOf?.[0] || {};
        let i = getMinCount((countObj as WFSchemaObject).minItems);
        const l = getMaxCount((countObj as WFSchemaObject).maxItems, chance);

        for (; i < l; i++) {
            const item = parseSchemaData(items as WFSchemaObject, mapping, chance);
            resp.push(item)
        }
    }

    return resp
}




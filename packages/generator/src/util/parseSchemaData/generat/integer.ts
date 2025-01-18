import {getMinCount} from "../util/getMinCount";
import {getMaxCount} from "../util/getMaxCount";
import {IMappingObjNumber,  TMapping, WFSchemaObject} from "../../../interface";
import {getMockMapping} from "../../getMockMapping";
import {getExample} from "../util/getExample";

export const generateInteger = (schema: WFSchemaObject, mapping: TMapping, chance): number | string => {
    const {
        key,
        enum: selection,
        default: defaultVal,
    } = schema;
    const map = (getMockMapping(key, mapping)  || {}) as IMappingObjNumber;

    if(defaultVal) {
        return defaultVal;
    }

    const example = getExample(schema, chance)
    if(example) {
        return example;
    }

    const arr = selection || map.values;
    if(arr) {
        const index = chance.integer({min: 0, max: arr.length - 1});
        return arr[index];
    }

    const min = map.min ?? getMinCount(schema.minLength);
    const max = map.max ?? getMaxCount(schema.maxLength, chance);
    const step = map.step || 1;
    const rand = Math.floor(Math.random() * Math.floor((max - min) / step) + 1);
    const number = min + rand * step;

    return map.type === 'string' ? String(number) : number;
}



const randomInt = (a: number, b: number) => {
    return Math.floor(Math.random() * (b - a + 1) + a);
}
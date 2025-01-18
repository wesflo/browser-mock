import {getMinCount} from "../util/getMinCount";
import {getMaxCount} from "../util/getMaxCount";
import {IMappingObjString, TMapping, WFSchemaObject} from "../../../interface";
import {getMockMapping} from "../../getMockMapping";
import {getExample} from "../util/getExample";

export const generateString = (schema: WFSchemaObject, mapping: TMapping, chance): any => {
    const {
        format,
        key,
        minLength,
        maxLength,
        enum: selection,
        default: defaultVal,
    } = schema;
    const map = (getMockMapping(key, mapping)  || {}) as IMappingObjString;

    if(defaultVal) {
        return defaultVal;
    }

    const example = getExample(schema, chance)
    if(example) {
        return example;
    }

    if(format) {
        const str = getStringByFormat(format, chance);
        if(str) return str;
    }

    const arr = selection || map.values;
    if(arr) {
        const index = chance.integer({min: 0, max: arr.length - 1});
        return arr[index];
    }

    const min = map.minLength ?? (getMinCount(minLength) || 3);
    const max = map.maxLength ?? getMaxCount(maxLength, chance);
    const length = map.length ?? chance.integer({min, max});
    const generator = getStringByType(map.type) || generateSimpleString;

    return generator(length, chance)
}

const getStringByType = (key: string) => {
    const typeMap = {
        paragraph: generateParagraph,
        string: generateSimpleString,
        number: generateNumber,
        link: generateLink,
    }
    return typeMap[key] ? typeMap[key] : null;
}

const getStringByFormat = (key: string, chance) => {
    const formatMap = {
        email: chance.email,
        ipv4: chance.ip,
        ipv6: chance.ipv6,
        uri: chance.url,
        url: chance.url,
        uuid: chance.hash,
    }

    return formatMap[key] ? formatMap[key]() : null;
}

const generateParagraph = (length: number, chance) => chance.sentence({ words: length }).slice(0, length).trim();
const generateSimpleString = (length, chance) => chance.string({length, symbols: false, alpha: true, numeric: true})
const generateNumber = (length, chance) =>  chance.string({length, pool: '0123456789'})
const generateLink = (length, chance) =>  chance.url()
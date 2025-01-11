import {SchemaObject} from "openapi3-ts/oas30";
import {getMinCount} from "../util/getMinCount";
import {getMaxCount} from "../util/getMaxCount";

export const generateString = (schema: SchemaObject, chance): any[] => {
    if(schema.format) {
        const str = getStringByType(schema.format, chance);
        if(str) return str;
    }

    const min = getMinCount(schema as SchemaObject) || 4;
    const max = getMaxCount(schema as SchemaObject, chance);

    if(min === max) {
        return chance.word({ length: max })
    }

    const sentence = chance.sentence({ words: max });
    const length = chance.integer({min, max});

    return sentence.slice(0, length).trim();
}

const getStringByType = (key: string, chance) => {
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

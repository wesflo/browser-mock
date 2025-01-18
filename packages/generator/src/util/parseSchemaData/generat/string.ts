import {SchemaObject} from "openapi3-ts/oas30";
import {getMinCount} from "../util/getMinCount";
import {getMaxCount} from "../util/getMaxCount";
import {TMapping} from "../../../interface";

export const generateString = (schema: SchemaObject, mapping: TMapping, chance): any => {
    const {format, enum: selection} = schema;
    if(format) {
        const str = getStringByType(format, chance);
        if(str) return str;
    }

    if(selection) {
        const index = chance.integer({min: 0, max: selection.length - 1});
        return selection[index];
    }

    const min = getMinCount(schema.minLength) || 4;
    const max = getMaxCount(schema.maxLength, chance);

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

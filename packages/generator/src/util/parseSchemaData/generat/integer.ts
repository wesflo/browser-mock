import {SchemaObject} from "openapi3-ts/oas30";
import {getMinCount} from "../util/getMinCount";
import {getMaxCount} from "../util/getMaxCount";
import {TMapping} from "../../../interface";

export const generateInteger = (schema: SchemaObject, mapping: TMapping, chance): any[] => {
    const min = getMinCount(schema.minLength) || 4;
    const max = getMaxCount(schema.maxLength, chance);

    return chance.integer({min, max})
}




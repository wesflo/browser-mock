import {SchemaObject} from "openapi3-ts/oas30";
import {getMinCount} from "../util/getMinCount";
import {getMaxCount} from "../util/getMaxCount";

export const generateInteger = (schema: SchemaObject, chance): any[] => {
    const min = getMinCount(schema as SchemaObject) || 4;
    const max = getMaxCount(schema as SchemaObject, chance);

    return chance.integer({min, max})
}




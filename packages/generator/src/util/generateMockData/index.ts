import {TMapping, TResponses} from "../../interface";
import {parseSchemaData} from "../parseSchemaData";
import {getExample} from "../parseSchemaData/util/getExample";
import {Chance} from "chance";

export const generateMockData = (responseObj: TResponses, mapping: TMapping): TResponses => {
    const {schema} = responseObj;
    const chance = new Chance();

    if (schema) {
        responseObj.mock = parseSchemaData(schema, mapping, chance);
    }

    return responseObj;
}
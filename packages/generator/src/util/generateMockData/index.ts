import {TResponses} from "../getResponses/interface";
import {parseSchemaData} from "../parseSchemaData";
import {getExample} from "../parseSchemaData/util/getExample";
import {Chance} from "chance";

export const generateMockData = (responseObj: TResponses): TResponses => {
    const {schema} = responseObj;
    const chance = new Chance();

    if (schema) {
        const example = getExample(schema, chance);
        responseObj.mock = example || parseSchemaData(schema, chance);
    }

    return responseObj;
}
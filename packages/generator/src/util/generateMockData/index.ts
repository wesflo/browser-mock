import {TMapping, TResponses} from "../../interface";
import {parseSchemaData} from "../parseSchemaData";
import {getExample} from "../parseSchemaData/util/getExample";
import {Chance} from "chance";

export const generateMockData = (responseObj: TResponses, mapping: TMapping): TResponses => {
    const {schema} = responseObj;
    const chance = new Chance();

    if (schema) {
        const example = getExample(responseObj, chance, false);

        responseObj.mock = parseSchemaData(schema, mapping, example?.value, chance);
    }

    return responseObj;
}
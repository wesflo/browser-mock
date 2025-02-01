import {IMappingObjString} from "../../../interface";

export const mixedConverter = (mapping: IMappingObjString) => {
    const min = mapping.minLength || mapping.length || 0;
    const max = mapping.maxLength || mapping.length || 10;

    return `[\\w\\-\\+\\%]${min}, ${max}`
}
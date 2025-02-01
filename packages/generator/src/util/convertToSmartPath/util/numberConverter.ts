import { IMappingObjNumber} from "../../../interface";

export const numberConverter = (mapping: IMappingObjNumber) => {
    const min = `${mapping.max || 1}`.length;
    const max = `${mapping.max || 123456789}`.length;

    return `[\\d]${min}, ${max}`
}
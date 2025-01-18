import {IMappingObj, TMapping} from "../../interface";

export const getMockMapping = (k: string, mapping: TMapping): IMappingObj | null => {
    const mapKey = Object.keys(mapping).find((mk => k.endsWith(mk)));

    return mapKey ? mapping[mapKey] : null;
}
import {TMapping, WFSchemaObject} from "../../../interface";

export const generateBoolean = (schema: WFSchemaObject, mapping: TMapping, chance): any[] => chance.bool()
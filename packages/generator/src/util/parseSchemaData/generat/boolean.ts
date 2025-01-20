import {TMapping, WFSchemaObject} from "../../../interface";

export const generateBoolean = (schema: WFSchemaObject, mapping: TMapping, example: object, chance): any[] => chance.bool()
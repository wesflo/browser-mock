import {IMappingObjNumber, IMappingObjString, TMapping} from "../../interface";
import {DYNAMIC_PARAM_CONVERTERS} from "./constant";

export const convertToSmartPath = (path: string, mapping: TMapping) => {
    const arr = path
        .split(/\//g)
        .map((str: string) => {
           if(/{([^}]*)}/g.test(str)) {
               const key = str.replace(/[{}]/g, '');
               const schema = mapping[key];
               const value = schema.value || schema.values
               if(value) {
                   return typeof value === 'string' ? value : value[Math.floor(Math.random() * ((value as string[]).length - 1))];
               }

               const converter = schema.type && DYNAMIC_PARAM_CONVERTERS[schema.type];
               if(converter) {
                    return converter(schema as IMappingObjString & IMappingObjNumber);
               }
           }
            return str;
        });
    return arr.join('/')
}
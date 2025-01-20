/*
import {isReferenceObject, ReferenceObject, WFSchemaObject, SchemasObject} from "openapi3-ts/oas30";
import {handleReferenceObject} from "./handleReferenceObject";
import {getSchemaType} from "../../getSchemaType";
import {mergeAllOf} from "./mergeAllOf";
import {pickOneOf} from "./pickOneOf";
import {parseArray} from "./parseArray";



export const parseObject = (obj: WFSchemaObject, schemas: SchemasObject): any => {
    if (obj.example) return obj.example;

    const resp = {};
    const props = obj.properties || {}

    for(const key in props) {
        const schema: WFSchemaObject | ReferenceObject = props[key];
        if (isReferenceObject(schema)) {
            resp[key] = <WFSchemaObject>handleReferenceObject(schema, schemas);
            return schemas;
        }
        const type = getSchemaType(schema);

        resp[key] = schemaMap[type] ?  schemaMap[type]() : {}
    }

    return resp;
};

const schemaMap = {
    allOf: mergeAllOf,
    oneOf: pickOneOf,
    array: parseArray,
    // object: parseObject,
}*/
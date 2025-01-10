import {isReferenceObject, ReferenceObject, SchemaObject, SchemasObject} from "openapi3-ts/oas30";
import {handleReferenceObject} from "./handleReferenceObject";
import {getSchemaType} from "./getSchemaType";
import {mergeAllOf} from "./mergeAllOf";
import {pickOneOf} from "./pickOneOf";
import {parseArray} from "./parseArray";



export const parseObject = (obj: SchemaObject, schemas: SchemasObject): any => {
    if (obj.example) return obj.example;

    const resp = {};
    const props = obj.properties || {}

    for(const key in props) {
        const schema: SchemaObject | ReferenceObject = props[key];
        if (isReferenceObject(schema)) {
            resp[key] = <SchemaObject>handleReferenceObject(schema, schemas);
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
    object: parseObject,
}
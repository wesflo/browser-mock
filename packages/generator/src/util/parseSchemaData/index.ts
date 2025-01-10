import {isReferenceObject, SchemaObject, SchemasObject} from "openapi3-ts/oas30";
import {getSchemaName} from "./helper/getSchemaName";
import {REF} from "../../constant";
import {getSchemaType} from "./helper/getSchemaType";
import {mergeAllOf} from "./helper/mergeAllOf";
import {parseArray} from "./helper/parseArray";
import {parseObject} from "./helper/parseObject";

export const parseSchemaData = (name: string, schemas: SchemasObject): SchemaObject => {
    const schema: SchemaObject = schemas[name];
    if(isReferenceObject(schema)) {
        const schemaName = getSchemaName(schema[REF]);
        return schemaName ? parseSchemaData(schemaName, schemas) : {};
    }
    const type = getSchemaType(schema);

    return schemaMap[type] ? schemaMap[type]() : schema;
}

const schemaMap = {
    allOf: mergeAllOf,
    array: parseArray,
    object: parseObject,
}
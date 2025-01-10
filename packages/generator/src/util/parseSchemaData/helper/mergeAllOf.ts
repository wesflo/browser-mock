import {isReferenceObject, ReferenceObject, SchemaObject, SchemasObject} from "openapi3-ts/oas30";
import {getSchemaName} from "./getSchemaName";
import {REF} from "../../../constant";
import {parseSchemaData} from "../index";
import {parseObject} from "./parseObject";

export const mergeAllOf = (  props: (SchemaObject | ReferenceObject)[], schemas: SchemasObject) => {
    let ret: any = {};
    props.forEach(prop => {
        if (isReferenceObject(prop)) {
            const schemaName = getSchemaName(prop[REF]);
            if (schemaName) {
                const schemaData = parseSchemaData(schemaName, schemas);
                ret = {
                    ...ret,
                    ...schemaData
                };
            }
        } else {
            const parsed = parseObject(prop, schemas);
            ret = {
                ...ret,
                ...parsed
            };
        }
    });

    return ret;
}
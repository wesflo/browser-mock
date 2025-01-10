import {isReferenceObject, ReferenceObject, SchemaObject, SchemasObject} from "openapi3-ts/oas30";
import {handleReferenceObject} from "./handleReferenceObject";
import {parseObject} from "./parseObject";

export const parseArray = ( arr: SchemaObject & { items: SchemaObject | ReferenceObject }, schemas: SchemasObject): Object[] => {
    if (arr.example) return arr.example;

    const {items: schema} = arr;

    if (isReferenceObject(schema)) {
        return [<SchemaObject>handleReferenceObject(schema, schemas)]
    }

    if (schema.type) {
        return [parseObject(schema, schemas)];
    }

    return [];
};

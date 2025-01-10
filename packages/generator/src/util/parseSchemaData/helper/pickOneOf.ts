import {isReferenceObject, ReferenceObject, SchemaObject, SchemasObject} from "openapi3-ts/oas30";
import {handleReferenceObject} from "./handleReferenceObject";
import {parseObject} from "./parseObject";

export const pickOneOf = (
    schema: (SchemaObject | ReferenceObject)[],
    schemas: SchemasObject
): any => {
    const property = schema[0];
    if (isReferenceObject(property)) {
        return handleReferenceObject(property, schemas)
    }
    return {
        ...parseObject(property, schemas)
    }
};
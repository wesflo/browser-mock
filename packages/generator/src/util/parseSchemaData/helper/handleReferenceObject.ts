import {getSchemaName} from "./getSchemaName";
import {REF} from "../../../constant";
import {ReferenceObject, SchemaObject, SchemasObject} from "openapi3-ts/oas30";
import {parseSchemaData} from "../index";

export const handleReferenceObject = (schema: SchemaObject | ReferenceObject, schemas: SchemasObject): SchemaObject | ReferenceObject => {
    const schemaName = getSchemaName(schema[REF]);

    return schemaName ? parseSchemaData(schemaName, schemas) : schema;
}

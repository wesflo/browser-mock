import {OpenAPIObject, SchemasObject} from "openapi3-ts/oas30";
import {TComponentSchemas} from "./interface";
import {parseSchemaData} from "../parseSchemaData";


export const getComponentSchemas = (obj: OpenAPIObject): TComponentSchemas => {
    const resp: TComponentSchemas = {};
    const {schemas} = obj.components;

    if(!schemas) return resp;

    for (const schemaName in schemas) {
        resp[schemaName] = parseSchemaData(schemaName, schemas as SchemasObject)
    }

    return resp;
}
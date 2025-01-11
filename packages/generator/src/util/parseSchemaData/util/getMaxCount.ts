import {SchemaObject} from "openapi3-ts/oas30";

export const getMaxCount = ({maxItems}: SchemaObject, chance): number => {
    return maxItems || chance.integer({ min: 4, max: 20 });
}

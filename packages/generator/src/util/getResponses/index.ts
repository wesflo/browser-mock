import {OpenAPIObject, PathItemObject} from "openapi3-ts/oas30";
import { TResponses} from "./interface";
import {APPLICATION_JSON} from "../../constant";


export const getResponses = (obj: OpenAPIObject): TResponses[] => {
    const resp: TResponses[] = [];

    for (const path in obj) {
        const methods: PathItemObject = obj[path];

        for (const method in methods) {
            const { responses } = methods[method]

            for (const status in responses) {
                const { content } = responses[status];
                const schema = content[APPLICATION_JSON];

                resp.push({
                    schema,
                    path,
                    method,
                    status,
                })
            }
        }
    }

    return resp;
}
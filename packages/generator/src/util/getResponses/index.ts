import {OpenAPIObject, PathItemObject} from "openapi3-ts/oas30";
import { TResponses} from "./interface";
import {APPLICATION_JSON} from "../../constant";


export const getResponses = (obj: OpenAPIObject): TResponses[] => {
    const resp: TResponses[] = [];
    const {paths} = obj;
    for (const path in paths) {
        const methods: PathItemObject = paths[path];

        for (const method in methods) {
            const { responses } = methods[method]

            for (const status in responses) {
                const { content } = responses[status];

                const {schema, example, examples} = content ? content[APPLICATION_JSON] || {} : {};

                resp.push({
                    path,
                    method,
                    status: Number(status),
                    schema,
                    example,
                    examples,
                })
            }
        }
    }

    return resp;
}
import {locateLine} from "./util/locateLine";
import {isValidUrl} from "./util/isValidUrl";
import {isValidJsonFilePath} from "./util/isValidJsonFilePath";
import {HTTP_STATUS_CODES, VALID_METHODS} from "./constant";
import {IManifest} from "../../interface";

export const manifestValidator = (json: IManifest): null | { line: number; error: string } => {
    const jsonString = JSON.stringify(json, null, 2);

    if (!Array.isArray(json.domains) || json.domains.length === 0) {
        return { line: locateLine(jsonString, 'domains'), error: "'domains' must be a non-empty array." };
    }

    for (let i = 0; i < json.domains.length; i++) {
        if (!isValidUrl(json.domains[i])) {
            return { line: locateLine(jsonString, json.domains[i]), error: `Invalid URL in 'domains' at index ${i}: ${json.domains[i]}` };
        }
    }

    if (!Array.isArray(json.requests) || json.requests.length === 0) {
        return { line: locateLine(jsonString, 'requests'), error: "'requests' must be a non-empty array." };
    }

    for (let i = 0; i < json.requests.length; i++) {
        const request = json.requests[i];

        if (typeof request.path !== "string" || !request.path.startsWith("/")) {
            return { line: locateLine(jsonString, request.path), error: `Invalid 'path' in request at index ${i}: Must start with '/'` };
        }

        if (!VALID_METHODS.includes(request.method)) {
            return { line: locateLine(jsonString, request.method), error: `Invalid 'method' in request at index ${i}: ${request.method}` };
        }

        for (const [statusCode, filePath] of Object.entries(request.response)) {
            if (!HTTP_STATUS_CODES.has(statusCode)) {
                return { line: locateLine(jsonString, statusCode), error: `Invalid HTTP status code '${statusCode}' in 'response' at request index ${i}` };
            }
            if (!isValidJsonFilePath(filePath)) {
                return { line: locateLine(jsonString, filePath), error: `Invalid file path in 'response' at request index ${i}, status ${statusCode}: ${filePath}` };
            }
        }
    }

    return null;
}
import { manifestValidator } from './index';
import { IManifest } from "../../interface";

describe("manifestValidator", () => {
    // Valid JSON schema
    const validManifest: IManifest = {
        domains: [
            "https://localhost",
            "https://example.com"
        ],
        requests: [
            {
                name: "Get Order",
                path: "/v1/order",
                method: "GET",
                response: {
                    "200": "v1-order_GET_200.json",
                    "404": "v1-order_GET_404.json"
                }
            }
        ]
    };

    // Invalid JSON examples
    const invalidManifests = {
        emptyDomains: {
            domains: [],
            requests: validManifest.requests
        },
        invalidDomain: {
            domains: ["invalid-url"],
            requests: validManifest.requests
        },
        emptyRequests: {
            domains: validManifest.domains,
            requests: []
        },
        invalidRequestPath: {
            domains: validManifest.domains,
            requests: [
                {
                    name: "Invalid Path",
                    path: "invalidPath",
                    method: "GET",
                    response: {}
                }
            ]
        },
        invalidRequestMethod: {
            domains: validManifest.domains,
            requests: [
                {
                    name: "Invalid Method",
                    path: "/v1/order",
                    method: "INVALID",
                    response: {}
                }
            ]
        },
        invalidResponseCode: {
            domains: validManifest.domains,
            requests: [
                {
                    name: "Invalid Response Code",
                    path: "/v1/order",
                    method: "GET",
                    response: {
                        "999": "v1-order_GET_999.json" // Invalid HTTP status code
                    }
                }
            ]
        },
        invalidResponsePath: {
            domains: validManifest.domains,
            requests: [
                {
                    name: "Invalid Response Path",
                    path: "/v1/order",
                    method: "GET",
                    response: {
                        "200": "invalid|path.json" // Invalid file path
                    }
                }
            ]
        }
    };

    it("should validate a correct manifest", () => {
        expect(manifestValidator(validManifest)).toBeNull();
    });

    it("should detect empty 'domains'", () => {
        const result = manifestValidator(invalidManifests.emptyDomains);
        expect(result).toEqual(expect.objectContaining({
            error: "'domains' must be a non-empty array."
        }));
    });

    it("should detect invalid domain URLs", () => {
        const result = manifestValidator(invalidManifests.invalidDomain);
        expect(result).toEqual(expect.objectContaining({
            error: "Invalid URL in 'domains' at index 0: invalid-url"
        }));
    });

    it("should detect empty 'requests'", () => {
        const result = manifestValidator(invalidManifests.emptyRequests);
        expect(result).toEqual(expect.objectContaining({
            error: "'requests' must be a non-empty array."
        }));
    });

    it("should detect invalid request path", () => {
        const result = manifestValidator(invalidManifests.invalidRequestPath as any);
        expect(result).toEqual(expect.objectContaining({
            error: "Invalid 'path' in request at index 0: Must start with '/'"
        }));
    });

    it("should detect invalid request method", () => {
        const result = manifestValidator(invalidManifests.invalidRequestMethod as any);
        expect(result).toEqual(expect.objectContaining({
            error: "Invalid 'method' in request at index 0: INVALID"
        }));
    });

    it("should detect invalid HTTP response code", () => {
        const result = manifestValidator(invalidManifests.invalidResponseCode as any);
        expect(result).toEqual(expect.objectContaining({
            error: "Invalid HTTP status code '999' in 'response' at request index 0"
        }));
    });

    it("should detect invalid response file paths", () => {
        const result = manifestValidator(invalidManifests.invalidResponsePath as any);
        expect(result).toEqual(expect.objectContaining({
            error: "Invalid file path in 'response' at request index 0, status 200: invalid|path.json"
        }));
    });
});
import {IManifest, IManifestRequest, TRequestMethod} from "../../interface";
import {generateMockFileName} from "../generateMockFileName";
import {readFileSync, writeFileSync} from "node:fs";
import * as chalk from "chalk";
import {OpenAPIObject, PathItemObject} from "openapi3-ts/oas30";
import {EMPTY_MANIFEST_REQUEST_NAME} from "../../constant";

const log = console.log;

export const  generateManifest = async (swaggerCnt: OpenAPIObject, mockTargetPath: string) => {
    const {paths, servers} = swaggerCnt;
    const manifestPath = mockTargetPath + '/manifest.json';
    const requestMap: {[key: string]: IManifestRequest} = {};
    let existingManifestCnt: IManifest = {domains: [], requests: []};

    try {
        const rawManifestCnt = readFileSync(manifestPath, { encoding: 'utf8'});
        rawManifestCnt && (existingManifestCnt = JSON.parse(rawManifestCnt));
    } catch (e) {
        log(chalk.blueBright('Can\'t read manifest.json - starting from scratch'));
    }

    for (const path in paths) {
        const methods: PathItemObject = paths[path];
        for (const m in methods) {
            const method: TRequestMethod = m.toUpperCase() as TRequestMethod;
            const { responses } = methods[m];
            const key = getPathMapKey(path, method);

            if(!requestMap[key]) {
                const existingReqObj = existingManifestCnt?.requests?.find((req: IManifestRequest) => req.path === path && req.method === method ) || {name: EMPTY_MANIFEST_REQUEST_NAME};
                requestMap[key] = {
                    name: existingReqObj.name || EMPTY_MANIFEST_REQUEST_NAME,
                    path,
                    method,
                    response: {}
                }
            }

            for (const status in responses) {
                requestMap[key].response[status] = generateMockFileName(path, method, status);
            }
        }
    }

    const manifestCnt: IManifest = {
        domains: swaggerCnt.servers?.map((server) => server.url) || [],
        requests: Object.keys(requestMap).map((key) => requestMap[key]) as IManifestRequest[],
    }

    try {
        await writeFileSync(manifestPath, JSON.stringify(manifestCnt, null, 2));
    } catch (e) {
        log(chalk.red('Something went wrong! Can\'t write manifest.json'));
        log(chalk.red(e));
    }
}

const getPathMapKey = (path, method) => `${path}_${method}`;
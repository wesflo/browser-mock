#!/usr/bin/env node
import {existsSync, mkdirSync, readFileSync, writeFileSync} from "node:fs";
import * as swaggerCombine from "swagger-combine";
import * as pkg from "../package.json";
import {getResponses} from "./util/getResponses";
import * as chalk from "chalk";
import {generateMockData} from "./util/generateMockData";
import {
    IManifest,
    IManifestRequest,
    IPromptOptions,
    TMapping,
    TPgkConfig,
    TRequestMethod,
    TResponses
} from "./interface";
import {generateMockFileName} from "./util/generateMockFileName";
import {prompt} from "promptly";
import {getMappings} from "./util/getMappings";
import * as path from "node:path";
import {generateManifest} from "./util/generateManifest";
import {OpenAPIObject} from "openapi3-ts/oas30";
import {generateMockFiles} from "./util/generateMockFiles";

const log = console.log;

const generator = async () => {
    const appRoot = process.cwd();
    let wfGeneratorOptions: TPgkConfig = {};

    try {
        const appPkgStr = readFileSync(path.resolve(appRoot, 'package.json'), {encoding: 'utf8'})
        wfGeneratorOptions = JSON.parse(appPkgStr).wfGenerator;
    } catch (e) {
        log(chalk.red('can\'t find/read package.json'));
    }

    const promptOptions: Partial<IPromptOptions> = {}

    promptOptions.swaggerPath = wfGeneratorOptions.swagger || await prompt('path to swagger.yml (mock/swagger.yaml)', {
        default: './api/swagger.yaml'
    });

    promptOptions.mappingPath = wfGeneratorOptions.mapping || wfGeneratorOptions.mappings || await prompt('path to mapping yaml (empty if noc mapping exists)', {
        default: ''
    });

    promptOptions.mockTargetPath = wfGeneratorOptions.target || await prompt('path where to extract mock files (mock)', {
        default: './mocks'
    });

    promptOptions.responsePath = await prompt('request path to update (empty for all)', {
        default: ''
    });

    promptOptions.responseMethode = promptOptions.responsePath ? await prompt('request method to update (empty for all)', {
        default: ''
    }) : null;

    promptOptions.responseStatus = promptOptions.responseMethode ? await prompt('request status to update (empty for all)', {
        default: ''
    }) : null;

    // const responsePath = '/v1/order/{orderNumber}/details';
    // const responseMethode = 'get';
    // const responseStatus = '200';

    const {mappingPath, swaggerPath, mockTargetPath} = promptOptions;

    const swaggerCnt: OpenAPIObject = await swaggerCombine(swaggerPath, {format: 'yaml'});
    const mapping: TMapping = mappingPath && await getMappings(mappingPath, appRoot);
    const responses: TResponses[] = getResponses(swaggerCnt);
    const mockData: TResponses[] = responses.map(resp => generateMockData(resp, mapping || {}));

    if (!existsSync(mockTargetPath)) {
        mkdirSync(mockTargetPath, {recursive: true});
    }

    await generateMockFiles(mockData, promptOptions as IPromptOptions)
    await generateManifest(swaggerCnt, mockTargetPath);

    log(chalk.blueBright('Done with config:'));
    log(chalk.blueBright(JSON.stringify(promptOptions, null, 2)));
}

(async () => {
    log(chalk.blueBright(`${pkg.name} v${pkg.version}\n${pkg.description}`));
    await generator();
})();

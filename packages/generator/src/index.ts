#!/usr/bin/env node
import {writeFileSync, readFileSync, existsSync, mkdirSync} from "node:fs";
import * as swaggerCombine from "swagger-combine";
import { parse } from "yaml"
import * as pkg from "../package.json";
import {getResponses} from "./util/getResponses";
import * as chalk from "chalk";
import {generateMockData} from "./util/generateMockData";
import {TMapping, TResponses} from "./interface";
import {generateMockFileName} from "./util/generateMockFileName";
import {prompt} from "promptly";
import {getMappings} from "./util/getMappings";
import * as path from "node:path";

const log = console.log;
const generator = async () => {
    const appRoot = process.cwd();
    let wfGeneratorOptions;

    try {
        const appPkgStr = readFileSync(path.resolve(appRoot , 'package.json'), { encoding: 'utf8'})
        wfGeneratorOptions = JSON.parse(appPkgStr).wfGenerator;
    } catch (e) {
        log(chalk.red('can\'t find/read package.json'));
    }

    const swaggerPath = wfGeneratorOptions.swagger || await prompt('path to swagger.yml (mock/swagger.yaml)', {
        default: '../mock/swagger.yaml'
    });

    const mappingPath: string|string[] = wfGeneratorOptions.mapping || wfGeneratorOptions.mappings || await prompt('path to mapping yaml (empty if noc mapping exists)', {
        default: ''
    });

    const mockTargetPath = wfGeneratorOptions.target || await prompt('path where to extract mock files (mock)', {
        default: './mocks'
    });

    const responsePath = await prompt('request path to update (empty for all)', {
        default: ''
    });

    const responseMethode = responsePath ? await prompt('request method to update (empty for all)', {
        default: ''
    }) : null;

    const responseStatus = responseMethode ? await prompt('request status to update (empty for all)', {
        default: ''
    }) : null;


    const cnt = await swaggerCombine(swaggerPath, {format: 'yaml'});
    const mapping: TMapping = await getMappings(mappingPath, appRoot)
    const responses: TResponses[] = getResponses(cnt);
    const mockData = responses.map(resp => generateMockData(resp, mapping));

    if (!existsSync(mockTargetPath)){
        mkdirSync(mockTargetPath, { recursive: true });
    }

    for (const resp of mockData) {
        try {
            if(resp.mock ) {
                const {path, method, status} = resp;
                if(
                    (!responsePath || responsePath === path)
                    && (!responseMethode || responseMethode === method)
                    && (!responseStatus || Number(responseStatus) === status)
                ) {
                    const filename = `${mockTargetPath}/${generateMockFileName(path,method , status)}.json`;
                    await writeFileSync(filename, JSON.stringify(resp.mock, null, 4));
                    log(chalk.green(`Generate mock: ${chalk.bold(filename)}`));
                }
            }
        } catch (e) {
            log(chalk.red('Something went wrong! Can\'t write File'));
            log(chalk.red(e));
        }
    }

    log(chalk.blueBright('Done with:'));
    log(chalk.blueBright(swaggerPath, mockTargetPath));
}

(async () => {
    log(chalk.blueBright(`${pkg.name} v${pkg.version}\n${pkg.description}`));
    await generator();
})();

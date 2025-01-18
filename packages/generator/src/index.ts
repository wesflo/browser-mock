#!/usr/bin/env node
import {writeFileSync, readFileSync} from "node:fs";
import * as swaggerCombine from "swagger-combine";
import { parse } from "yaml"
import * as pkg from "../package.json";
import {getResponses} from "./util/getResponses";
import * as chalk from "chalk";
import {generateMockData} from "./util/generateMockData";
import {TMapping, TResponses} from "./interface";
import {generateMockFileName} from "./util/generateMockFileName";
import {prompt} from "promptly";

const log = console.log;
const generator = async () => {
    // const swaggerPath = await prompt('path to swagger.yml (../mock/swagger.yaml)', {
    //     default: '../mock/swagger.yaml'
    // });
    // const mockTargetPath = await prompt('path where to extract mock files (./mocks)', {
    //     default: './mocks'
    // });
    // const responsePath = await prompt('request path to update (empty for all)', {
    //     default: ''
    // });
    //
    // const responseMethode = responsePath ? await prompt('request method to update (empty for all)', {
    //     default: ''
    // }) : null;
    //
    // const responseStatus = responseMethode ? await prompt('request status to update (empty for all)', {
    //     default: ''
    // }) : null;

    const swaggerPath = '../mock/swagger.yaml';
    const mockTargetPath = './mocks';
    const responsePath = '/v1/order';
    const responseMethode = 'post';
    const responseStatus = '200';

    const cnt = await swaggerCombine(swaggerPath, {format: 'yaml'});
    const mappingString = readFileSync(swaggerPath.replace('swagger.yaml', 'mapping.yaml'), { encoding: 'utf8'})
    const mapping: TMapping = parse(mappingString || '')

    const responses: TResponses[] = getResponses(cnt);
    const mockData = responses.map(resp => generateMockData(resp, mapping));

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
                    await writeFileSync(`${mockTargetPath}/responses.json`, JSON.stringify({...resp}, null, 4));
                    await writeFileSync(`${mockTargetPath}/mapping.json`, JSON.stringify(mapping, null, 4));
                    log(chalk.green(`Generate mock in file: ${filename}`));
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
    log(chalk.blueBright(
        `${pkg.name} v${pkg.version}
        ${pkg.description}
        `));
    await generator();
})();

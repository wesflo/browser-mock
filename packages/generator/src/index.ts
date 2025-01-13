#!/usr/bin/env node
import {writeFileSync} from "node:fs";
import * as swaggerCombine from "swagger-combine";
import * as pkg from "../package.json";
import {getResponses} from "./util/getResponses";
import * as chalk from "chalk";
import {generateMockData} from "./util/generateMockData";
import {TResponses} from "./util/getResponses/interface";
import {generateMockFileName} from "./util/generateMockFileName";
import {prompt} from "promptly";

const log = console.log;
const generator = async () => {
    const swaggerPath = await prompt('path to swagger.yml (./mock/swagger.yml)', {
        default: './mock/swagger.yml'
    });
    const mockTargetPath = await prompt('path where to extract mock files (./mocks)', {
        default: './mocks'
    });
    const responsePath = await prompt('request path to update (all)', {
        default: null
    });

    const responseMethode = responseMethode ? await prompt('request method to update (all)', {
        default: null
    }) : null;

    const responseStatus = responseMethode ? await prompt('request status to update (all)', {
        default: null
    }) : null;

    // const swaggerPath = '../mock/swagger.yaml';
    // const mockTargetPath = './mocks';
    // const responsePath = '/v1/return/fees';
    // const responseMethode = 'post';
    // const responseStatus = '403';

    const cnt = await swaggerCombine(swaggerPath, {format: 'yaml'});
    const responses: TResponses[] = getResponses(cnt);
    const mockData = responses.map(generateMockData);

    // await writeFileSync(`${targetPath}/responses.json`, JSON.stringify({responses}, null, 4));


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

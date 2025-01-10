#!/usr/bin/env node
import {writeFileSync} from "node:fs";
import * as swaggerCombine from "swagger-combine";
import * as pkg from "../package.json";
import {getComponentSchemas} from "./util/getComponentSchemas";
import {getResponses} from "./util/getResponses";
import * as chalk from "chalk";

const log = console.log;
const generator = async () => {
    // const swaggerPath = await promptly.prompt('path to swagger.yml (./mock/swagger.yml)', {
    //     default: './mock/swagger.yml'
    // });
    // const targetPath = await promptly.prompt('path where to extract mock files (./mocks)', {
    //     default: './mocks'
    // });

    const swaggerPath = '../mock/swagger.yaml';
    const targetPath = './mocks';

    const cnt = await swaggerCombine(swaggerPath, {format: 'yaml'});
    const responses = getResponses(cnt);
    // const schemas = getComponentSchemas(cnt);

    await writeFileSync(`${targetPath}/tmp.json`, JSON.stringify({responses, }));


    log(chalk.redBright(swaggerPath, targetPath));
    // program
    //     .command(pkg.name)
    //     .version(pkg.version)
    //     .description(pkg.description)
    //     .option('-p, --path <path>', 'path to swagger yml', './mock/swagger.yml')
    //     .option('-t, --target <path>', 'path where to extract mock files', './mocks')
    //     .action((obj, options) => {
    //         console.log( 4555555 )
    //         log(obj);
    //     })
    //     .parse();
}

(async () => {
    log(chalk.blueBright(
        `${pkg.name} v${pkg.version}
        ${pkg.description}
        `));
    await generator();
})();

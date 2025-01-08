#!/usr/bin/env node
import * as promptly from "promptly";
import * as chalk from "chalk";
import * as pkg from "../package.json";


const log = console.log;
const generator = async () => {
    const swagger = await promptly.prompt('path to swagger.yml (./mock/swagger.yml)', {
        default: './mock/swagger.yml'
    });
    const target = await promptly.prompt('path where to extract mock files (./mocks)', {
        default: './mocks'
    });

    log(chalk.redBright(target, swagger));
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

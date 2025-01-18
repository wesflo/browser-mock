import { readFileSync} from "node:fs";
import {parse} from "yaml";
import * as path from "node:path";
import * as chalk from "chalk";
const log = console.log;

export const getMappings = async (mappingsPath: string | string[], appRoot: string) => {
    let mappings = {};

    try {
        if(typeof mappingsPath === 'string') {
            const mappingString = readFileSync(path.resolve(appRoot , mappingsPath), { encoding: 'utf8'})
            return await parse(mappingString || '')
        }

        for (const mappingPath of mappingsPath) {
            const mappingString = readFileSync(path.resolve(appRoot , mappingPath), { encoding: 'utf8'});
            const obj = await parse(mappingString || '')

            mappings = {
                ...mappings,
                ...obj,
            }
        }
    } catch (e) {
        log(chalk.red('Can\'t read 1:n mapping files'));
    }

    return mappings;
}
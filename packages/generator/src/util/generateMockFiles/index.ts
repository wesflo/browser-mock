import {generateMockFileName} from "../generateMockFileName";
import {writeFileSync} from "node:fs";
import * as chalk from "chalk";
import {IPromptOptions} from "../../interface";
const log = console.log;

export const  generateMockFiles = async (mockData, promptOptions: IPromptOptions ) => {
    const {mockTargetPath, responsePath, responseMethode, responseStatus} = promptOptions;

    for (const resp of mockData) {
        const {path, method, status} = resp;
        const mockFileName = generateMockFileName(path, method, status);
        const mockTargetFile = `${mockTargetPath}/${mockFileName}`;

        if (
            resp.mock &&
            (!responsePath || responsePath === path)
            && (!responseMethode || responseMethode.toLowerCase() === method)
            && (!responseStatus || Number(responseStatus) === status)
        ) {
            try {
                await writeFileSync(mockTargetFile, JSON.stringify(resp.mock, null, 4));
                log(chalk.green(`Generate mock: ${chalk.bold(mockTargetFile)}`));

            } catch (e) {
                log(chalk.red(`Something went wrong! Can\'t write ${mockTargetFile}`));
                log(chalk.red(e));
            }
        }
    }
}
export const generateFilePath = (rawFilePath: string, pDir: string) => {
    const cleanedFilePath = createPath(rawFilePath)
    const stepsBack = cleanedFilePath.match(/\.\.\//g) || [];

    const pDirPartials = pDir.split('+');
    for(let i of stepsBack){
        pDirPartials.pop();
    }
    pDirPartials.push(cleanedFilePath.replace(/[{1,2}.].\//g, ''));

    return pDirPartials.join('/')
}

const createPath = (str: string) => str.replace('+', '/');

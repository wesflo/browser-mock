export const locateLine = (jsonString: string, path: string): number => {
    const lines = jsonString.split("\n");
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(path)) {
            return i + 1;
        }
    }
    return -1;
}

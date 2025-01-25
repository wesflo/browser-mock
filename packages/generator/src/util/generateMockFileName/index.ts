export const generateMockFileName = (path: string, method: string, status: number | string) => {
    let cleanPath = path.replace(/\//g, '-')
        .replace(/[^\w-]/g, '');

    if(cleanPath.at(0) === '-') {
        cleanPath = cleanPath.substring(1);
    }

    return `${cleanPath}_${method}_${status}.json`
}
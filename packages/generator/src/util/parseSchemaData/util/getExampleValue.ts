
export const getExampleValue = (keyPath: string, obj: any) => {
    return obj[keyPath] || null;
}
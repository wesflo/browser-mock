export const isValidJsonFilePath = (path: string): boolean => /^[^\\<>:\"|?*]+\.json$/.test(path);
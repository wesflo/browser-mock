export const jsonFileContent = async (file) => {
    const str = await file.text()

    return JSON.parse(str)
}
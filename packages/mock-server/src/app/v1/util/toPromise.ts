export const toPromise = async (to) => await new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
    }, Number(to))
})
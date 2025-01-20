export const flattenExample = (obj: object, res = {}, parentKey = '') => {
    for(let key in obj) {
        const modifiedKeyName = parentKey ? [parentKey, key].join('.') : key;

        if(typeof obj[key] == 'object') {
            flattenExample(obj[key], res, modifiedKeyName);
        }else{
            res[modifiedKeyName] = obj[key];
        }
    }
    return res;
}

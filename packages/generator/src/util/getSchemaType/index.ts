export const getSchemaType = (schema): string | null => {
    const arr = ['allOf', 'oneOf', 'anyOf'];

    for (let key in arr) {
        if(schema[key]) {
            return key;
        }
    }

    return schema.type || null;
};
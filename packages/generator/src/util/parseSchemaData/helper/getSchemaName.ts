export const getSchemaName = (ref: string): string | null => {
    const re = /#\/components\/schemas\/(.*)/;
    const matches = ref.match(re);

    return matches[0] || null;
};
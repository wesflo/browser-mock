
export const getMaxCount = (max: number, chance): number => {
    return max || chance.integer({ min: 4, max: 20 });
}

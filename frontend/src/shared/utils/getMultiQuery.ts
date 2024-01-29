export const getMultiQuery = (name: string, value: string[]) => {
    return value && value.length
        ? `&${name}=${value.map((el) => `${el}`).join(',')}`
        : '';
};

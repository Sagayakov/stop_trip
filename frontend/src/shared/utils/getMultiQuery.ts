export const getMultiQuery = (name: string, value: string[] | undefined) => {
    return value && value.length
        ? `&${name}=${value.map((el) => `${el}`).join(',')}`
        : '';
};

export const getMultiQuery = (name: string, value: string[]) => {
    return value.length
        ? `&${name}=${value.map((el) => `${el}`).join(',')}`
        : '';
}
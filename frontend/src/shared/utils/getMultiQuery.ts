export const getMultiQuery = (name: string, value: string[]) => {
    return value
        ? `&${name}=${value.map((el) => `${el}`).join(',')}`
        : '';
}
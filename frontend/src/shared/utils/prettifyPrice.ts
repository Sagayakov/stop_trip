export const prettifyPrice = (price: number) => {
    const str = price.toString();
    const dotIndex = str.indexOf('.');

    return `₹ ${Number(str.slice(0, dotIndex)).toLocaleString('ru')}${str.slice(
        dotIndex
    )}`;
};

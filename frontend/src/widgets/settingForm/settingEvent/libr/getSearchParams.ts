import { TypeDate, Price } from './TypeOfEventFilter.ts';

export const getSearchParams = (end_date: TypeDate, start_date: TypeDate, is_online: boolean, price: Price) => {
    const isOnlineQuery = is_online ? '&is_online=true' : '';

    const priceMaxQuery = price.max
        ? `&price_max=${price.max.toString().replace(/,/g, '.')}`
        : '';

    const priceMinQuery = price.min
        ? `&price_min=${price.min.toString().replace(/,/g, '.')}`
        : '';

    const startDateQuery = start_date.date
        ? `&start_date=${start_date.date}${
            start_date.time && `Т${end_date.time}:00%2B03${':'}00`
        }`
        : '';

    const endDateQuery = end_date.date
        ? `&end_date=${end_date.date}${
            end_date.time && `Т${start_date.time}:00%2B03${':'}00`
        }`
        : '';
    return `${startDateQuery}${endDateQuery}${isOnlineQuery}${priceMinQuery}${priceMaxQuery}`;
}
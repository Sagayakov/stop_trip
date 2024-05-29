import { getMultiQuery } from 'shared/utils/getMultiQuery';
import { Price } from './TypeForExcursionFilter';

export const getSearchParams = (
    city: string[],
    excursion_food: boolean,
    excursion_transfer: boolean,
    price: Price,
) => {
    const excursionCity = getMultiQuery('city', city);
    const food = excursion_food ? '&excursion_food=true' : '';
    const transfer = excursion_transfer ? '&excursion_transfer=true' : '';
    const priceMaxQuery = price.max
        ? `&price_max=${price.max.toString().replace(/,/g, '.')}`
        : '';

    const priceMinQuery = price.min
        ? `&price_min=${price.min.toString().replace(/,/g, '.')}`
        : '';

    return `${excursionCity}${food}${transfer}${priceMinQuery}${priceMaxQuery}`;
};

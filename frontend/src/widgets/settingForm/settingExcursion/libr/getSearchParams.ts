import { getMultiQuery } from 'shared/utils/getMultiQuery';

export const getSearchParams = (
    city: string[],
    excursion_food: boolean,
    excursion_transfer: boolean
) => {
    const excursionCity = getMultiQuery('city', city);
    const food = excursion_food ? '&excursion_food=true' : '';
    const transfer = excursion_transfer ? '&excursion_transfer=true' : '';

    return `${excursionCity}${food}${transfer}`;
};

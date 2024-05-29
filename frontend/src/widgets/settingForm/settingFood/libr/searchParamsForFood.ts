import { getMultiQuery } from 'shared/utils/getMultiQuery';
import { Price } from './TypeForFoodForm';

export const searchParamsForFood = (
    city: string[],
    food_delivery: boolean,
    food_establishment: boolean,
    food_type: string[],
    price: Price,
) => {
    const foodCity = getMultiQuery('city', city);
    const type = food_type ? `&food_type=${food_type.join('%2C')}` : '';
    const delivery = food_delivery ? `&food_delivery=${food_delivery}` : '';

    const establishment = food_establishment
        ? `&food_establishment=${food_establishment}`
        : '';

    const priceMaxQuery = price.max
        ? `&price_max=${price.max.toString().replace(/,/g, '.')}`
        : '';

    const priceMinQuery = price.min
        ? `&price_min=${price.min.toString().replace(/,/g, '.')}`
        : '';

    return { foodCity, type, delivery, establishment, priceMaxQuery, priceMinQuery };
};

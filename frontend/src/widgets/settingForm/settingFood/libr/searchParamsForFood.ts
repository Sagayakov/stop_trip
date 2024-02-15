import { getMultiQuery } from 'shared/utils/getMultiQuery';

interface FoodType {
    label: string;
    value: string;
}

export const searchParamsForFood = (
    city: string[],
    food_delivery: boolean,
    food_establishment: boolean,
    food_type: FoodType[]
) => {
    const foodCity = getMultiQuery('city', city);
    const type = food_type ? `&food_type=${food_type.join('%2C')}` : '';
    const delivery = food_delivery ? `&food_delivery=${food_delivery}` : '';

    const establishment = food_establishment
        ? `&food_establishment=${food_establishment}`
        : '';

    return { foodCity, type, delivery, establishment };
};

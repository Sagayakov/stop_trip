import { getMultiQuery } from 'shared/utils/getMultiQuery';

interface FoodType {
    label: string;
    value: string;
}

export const searchParamsForFood = (
    city: string[],
    food_delivery: boolean,
    food_establishment: boolean,
    food_type: FoodType
) => {
    let foodCity = '';

    try {
        foodCity = getMultiQuery('city', city);
    } catch (error) {
        console.log(error);
    }

    let foodTypes = '';

    try {
        if (food_type) {
            Object.entries(food_type).map((el) => {
                foodTypes = foodTypes + el[1] + '%2C';
            });

            foodTypes = foodTypes.slice(0, foodTypes.length - 3);
        }
    } catch (error) {
        console.log(error);
    }

    const type = food_type ? `&food_type=${foodTypes}` : '';
    const delivery = food_delivery ? `&food_delivery=${food_delivery}` : '';
    const establishment = food_establishment
        ? `&food_establishment=${food_establishment}`
        : '';

    return { foodCity, type, delivery, establishment };
};

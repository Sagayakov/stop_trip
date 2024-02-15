import { FiltersType } from 'app/api/types/filtersType';

export const getDefaultValues = (
    params: URLSearchParams,
    data: FiltersType | undefined
) => {
    if (data) {
        return {
            city: params.get('city')?.split(','),
            food_delivery: !!params.get('food_delivery'),
            food_establishment: !!params.get('food_establishment'),
            food_type: params.get('food_type')?.split(','),
        };
    }
};

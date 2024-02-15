import { FiltersType } from 'app/api/types/filtersType';

export const getDefaultValues = (
    params: URLSearchParams,
    data: FiltersType | undefined
) => {
    if (data) {
        return {
            city: params.get('city')?.split(','),
            excursion_food: !!params.get('excursion_food'),
            excursion_transfer: !!params.get('excursion_transfer'),
        };
    }
};

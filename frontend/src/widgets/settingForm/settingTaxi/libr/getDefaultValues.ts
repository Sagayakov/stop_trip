import { FiltersType } from 'app/api/types/filtersType';

export const getDefaultValues = (
    params: URLSearchParams,
    data: FiltersType | undefined
) => {
    if (data) {
        return {
            city: params.get('city')?.split(','),

            taxi_unit: params.get('taxi_unit')?.split(','),

            taxi_type: params.get('taxi_type')?.split(','),

            price: {
                min: params.get('price_min')
                    ? Number(params.get('price_min'))
                    : undefined,
                max: params.get('price_max')
                    ? Number(params.get('price_max'))
                    : undefined,
            },
        };
    }
};

import { FiltersType } from 'app/api/types/filtersType';

export const getDefaultValues = (
    params: URLSearchParams,
    data: FiltersType | undefined
) => {
    if (data) {
        return {
            city: params.get('city')?.split(','),
            service_home_visit: !!params.get('market_condition'),
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

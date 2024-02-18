import { FiltersType } from 'app/api/types/filtersType';

export const getDefaultValues = (
    params: URLSearchParams,
    data: FiltersType | undefined
) => {
    if (data) {
        return {
            city: params.get('city')?.split(','),

            exchange_for: params.get('exchange_for') || undefined,

            proposed_currency: params.get('proposed_currency') || undefined,

            exchange_rate: params.get('exchange_rate')
                ? Number(params.get('exchange_rate'))
                : undefined,
        };
    }
};

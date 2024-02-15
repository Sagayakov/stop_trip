import { FiltersType } from 'app/api/types/filtersType';

type SelectOption = {
    value: string;
    label: string;
};

export const getDefaultValues = (
    params: URLSearchParams,
    data: FiltersType | undefined
) => {
    if (data) {
        return {
            city: params.get('city')?.split(','),

            exchange_for: params
                .get('exchange_for')
                ?.split(',')
                .map((el) => ({
                    value: el,
                    label: (data['exchange_for'] as SelectOption[]).find(
                        (item) => item.value === el
                    )?.label,
                })),

            proposed_currency: params
                .get('proposed_currency')
                ?.split(',')
                .map((el) => ({
                    value: el,
                    label: (data['proposed_currency'] as SelectOption[]).find(
                        (item) => item.value === el
                    )?.label,
                })),

            exchange_rate: params.get('exchange_rate')
                ? Number(params.get('exchange_rate'))
                : undefined,
        };
    }
};

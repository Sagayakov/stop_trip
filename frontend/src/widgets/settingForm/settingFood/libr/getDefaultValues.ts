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
            food_delivery: !!params.get('food_delivery'),
            food_establishment: !!params.get('food_establishment'),
            food_type: params
                .get('food_type')
                ?.split(',')
                .map((el) => ({
                    value: el,
                    label: (data['food_type'] as SelectOption[]).find(
                        (item) => item.value === el
                    )?.label,
                })),
        };
    }
};

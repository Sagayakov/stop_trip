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

            document_duration: params
                .get('document_duration')
                ?.split(',')
                .map((el) => ({
                    value: el,
                    label: (data['document_duration'] as SelectOption[]).find(
                        (item) => item.value === el
                    )?.label,
                })),

            document_type: params
                .get('document_type')
                ?.split(',')
                .map((el) => ({
                    value: el,
                    label: (data['document_type'] as SelectOption[]).find(
                        (item) => item.value === el
                    )?.label,
                })),
        };
    }
};

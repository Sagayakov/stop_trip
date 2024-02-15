import { FiltersType } from 'app/api/types/filtersType';

export const getDefaultValues = (
    params: URLSearchParams,
    data: FiltersType | undefined
) => {
    if (data) {
        return {
            city: params.get('city')?.split(','),
            document_duration: params.get('document_duration')?.split(','),
            document_type: params.get('document_type')?.split(','),
        };
    }
};

import { FiltersType } from 'app/api/types/filtersType';

export const getDefaultValues = (
    params: URLSearchParams,
    data: FiltersType | undefined
) => {
    if (data) {
        const endParams = params.get('end_date');
        const startParams = params.get('start_date');

        // "2024-01-22T16:37:02.304665+03:00"
        const dateEndIndex = 10;
        const timeStartIndex = 11;
        const timeEndIndex = 16;

        return {
            city: params.get('city')?.split(','),

            end_date: endParams
                ? {
                      date: endParams.slice(0, dateEndIndex),
                      time: endParams.slice(timeStartIndex, timeEndIndex),
                  }
                : undefined,

            start_date: startParams
                ? {
                      date: startParams.slice(0, dateEndIndex),
                      time: startParams.slice(timeStartIndex, timeEndIndex),
                  }
                : undefined,

            is_online: !!params.get('is_online'),

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

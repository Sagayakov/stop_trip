import { FiltersType } from 'app/api/types/filtersType';

export const getDefaultValues = (
    params: URLSearchParams,
    data: FiltersType | undefined
) => {
    if (data) {
        return {
            city: params.get('city')?.split(','),

            job_type: params.get('job_type')?.split(','),

            job_payment_type: params.get('job_payment_type')?.split(','),

            job_experience: !!params.get('job_experience'),

            job_duration: params.get('job_duration')?.split(','),

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

import { FiltersType } from 'app/api/types/filtersType';

export const getDefaultValues = (
    params: URLSearchParams,
    data: FiltersType | undefined
) => {
    if (data) {
        return {
            city: params.get('city')?.split(','),

            transport_type_of_service: params
                .get('transport_type_of_service')
                ?.split(','),

            transport_type: params.get('transport_type')?.split(','),

            transport_category: params.get('transport_category')?.split(','),

            transport_brand: params.get('transport_brand')?.split(','),

            transport_model: params.get('transport_model')?.split(','),

            transport_engine_type: params
                .get('transport_engine_type')
                ?.split(','),

            transport_engine_volume: {
                min: params.get('transport_engine_volume_min')
                    ? Number(params.get('transport_engine_volume_min'))
                    : undefined,
                max: params.get('transport_engine_volume_max')
                    ? Number(params.get('transport_engine_volume_max'))
                    : undefined,
            },

            transport_drive_type: params
                .get('transport_drive_type')
                ?.split(','),

            transport_year_of_production: {
                min: params.get('transport_year_of_production_min')
                    ? Number(params.get('transport_year_of_production_min'))
                    : undefined,
                max: params.get('transport_year_of_production_max')
                    ? Number(params.get('transport_year_of_production_max'))
                    : undefined,
            },

            transport_transmission_type: params
                .get('transport_transmission_type')
                ?.split(','),

            transport_body_type: params.get('transport_body_type')?.split(','),

            transport_condition: params.get('transport_condition')?.split(','),

            transport_commission: {
                min: params.get('transport_commission_min')
                    ? Number(params.get('transport_commission_min'))
                    : undefined,
                max: params.get('transport_commission_max')
                    ? Number(params.get('transport_commission_max'))
                    : undefined,
            },

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

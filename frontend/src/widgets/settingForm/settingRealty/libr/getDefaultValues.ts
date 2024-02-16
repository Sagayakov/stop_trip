import { FiltersType } from 'app/api/types/filtersType';

export const getDefaultValues = (
    params: URLSearchParams,
    data: FiltersType | undefined
) => {
    if (data) {
        return {
            city: params.get('city')?.split(','),

            property_type_of_service: params
                .get('property_type_of_service')
                ?.split(','),

            region: params.get('region')?.split(','),

            property_house_type: params.get('property_house_type')?.split(','),

            property_floor: params.get('property_floor')
                ? Number(params.get('property_floor'))
                : undefined,

            property_rental_condition: params
                .get('property_rental_condition')
                ?.split(','),

            price: {
                min: params.get('price_min')
                    ? Number(params.get('price_min'))
                    : undefined,
                max: params.get('price_max')
                    ? Number(params.get('price_max'))
                    : undefined,
            },

            property_type: params.get('property_type')?.split(','),

            property_area: {
                min: params.get('property_area_min')
                    ? Number(params.get('property_area_min'))
                    : undefined,
                max: params.get('property_area_max')
                    ? Number(params.get('property_area_max'))
                    : undefined,
            },

            property_living_area: {
                min: params.get('property_living_area_min')
                    ? Number(params.get('property_living_area_min'))
                    : undefined,
                max: params.get('property_living_area_max')
                    ? Number(params.get('property_living_area_max'))
                    : undefined,
            },

            property_sleeping_places: {
                min: params.get('property_sleeping_places_min')
                    ? Number(params.get('property_sleeping_places_min'))
                    : undefined,
                max: params.get('property_sleeping_places_max')
                    ? Number(params.get('property_sleeping_places_max'))
                    : undefined,
            },

            property_has_furniture: !!params.get('property_has_furniture'),

            property_amenities: params.get('property_amenities')?.split(','),

            property_rooms_count: {
                min: params.get('property_rooms_count_min')
                    ? Number(params.get('property_rooms_count_min'))
                    : undefined,
                max: params.get('property_rooms_count_max')
                    ? Number(params.get('property_rooms_count_max'))
                    : undefined,
            },

            property_bathroom_type: params
                .get('property_bathroom_type')
                ?.split(','),

            property_bathroom_count: {
                min: params.get('property_bathroom_count_min')
                    ? Number(params.get('property_bathroom_count_min'))
                    : undefined,
                max: params.get('property_bathroom_count_max')
                    ? Number(params.get('property_bathroom_count_max'))
                    : undefined,
            },

            property_balcony: params.get('property_balcony')?.split(','),

            property_has_parking: !!params.get('property_has_parking'),

            property_commission: {
                min: params.get('property_commission_min')
                    ? Number(params.get('property_commission_min'))
                    : undefined,
                max: params.get('property_commission_max')
                    ? Number(params.get('property_commission_max'))
                    : undefined,
            },

            property_prepayment: params.get('property_prepayment')?.split(','),
        };
    }
};

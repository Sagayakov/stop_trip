export interface SelectOptionValues{
    category: StringOptions[];
    city: StringOptions[];
    document_duration: StringOptions[];
    document_type: StringOptions[];
    exchange_for: StringOptions[];
    excursion_food: BooleanStringOptions[];
    excursion_transfer: BooleanStringOptions[];
    food_delivery: BooleanStringOptions[];
    food_establishment: BooleanStringOptions[];
    food_type: StringOptions[];
    is_online: BooleanStringOptions[];
    job_duration: StringOptions[];
    job_experience: BooleanStringOptions[];
    job_payment_type: StringOptions[];
    job_type: StringOptions[];
    market_condition: StringOptions[];
    price: MinMax;
    property_amenities: StringOptions[];
    property_area: MinMax;
    property_bathroom_count: NumberOptions[];
    property_bathroom_type: StringOptions[];
    property_balcony: StringOptions[];
    property_has_furniture: BooleanStringOptions[];
    property_house_type: StringOptions[];
    property_rent_duration: StringOptions[];
    property_rental_condition: StringOptions[];
    property_rooms_count: MinMax;
    property_prepayment: StringOptions[];
    property_sleeping_places: MinMax;
    property_type: StringOptions[];
    property_type_of_service: StringOptions[];
    proposed_currency: StringOptions[];
    region: StringOptions[];
    service_home_visit: BooleanStringOptions[];
    taxi_type: StringOptions[];
    taxi_unit: StringOptions[];
    transport_body_type: StringOptions[];
    transport_brand: StringOptions[];
    transport_category: StringOptions[];
    transport_commission: MinMax;
    transport_condition: StringOptions[];
    transport_drive_type: StringOptions[];
    transport_engine_type: StringOptions[];
    transport_engine_volume: MinMax;
    transport_model: StringOptions[];
    transport_rent_duration: StringOptions[];
    transport_transmission_type: StringOptions[];
    transport_type: StringOptions[];
    transport_type_of_service: StringOptions[];
    transport_year_of_production: MinMax;
}

export interface StringOptions {
    value: string;
    label: string;
}
export interface BooleanStringOptions {
    value: boolean;
    label: string;
}
export interface MinMax{
    min: number;
    max: number;
}
export interface NumberOptions{
    value: number;
    label: number;
}
export interface TypeSettingTransport {
    region: string[];
    city: string[];
    transport_type_of_service: string[];
    transport_type: string[];
    transport_category: string[];
    transport_brand: string[];
    transport_model: string[];
    transport_engine_type: string[];
    transport_engine_volume: Price;
    transport_drive_type: string[];
    transport_year_of_production: Price;
    transport_transmission_type: string[];
    transport_body_type: string[];
    transport_condition: string[];
    transport_commission: Price;
    price: Price;
}
export interface SelectOption {
    value: string;
    label: string;
}
export interface Price {
    min: number;
    max: number;
}

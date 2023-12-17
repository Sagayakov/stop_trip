export interface TypeSettingTransport {
    transport_type_of_service: string[];
    transport_type: string[];
    transport_category: string[];
    transport_brand: string[];
    transport_model: string[];
    transport_engine_type: string[];
    transport_engine_volume: EngineCapacity;
    transport_drive_type: string[];
    transport_year_of_production: YearOfProduction;
    transport_transmission_type: string[];
    transport_body_type: string[];
    transport_condition: string[];
    transport_commission: Commission;
    price: Price;
}
export interface SelectOption {
    value: string;
    label: string;
}
export interface EngineCapacity{
    min: number;
    max: number;
}
export interface YearOfProduction{
    min: number;
    max: number;
}

export interface Commission {
    min: number;
    max: number;
}
export interface Price {
    min: number;
    max: number;
}
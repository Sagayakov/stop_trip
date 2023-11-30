export interface TypeSettingTransport {
    transport_type_of_service: string[];
    transport_type: string[];
    transport_category: string[];
    transport_brand: number;
    transport_model: number;
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
//type TypeOfService = 'Аренда' | 'Продажа';

//type TypeOfTransport = 'Наземный' | 'Водный';
//type Drive = 'Передний' | 'Задний' | 'Постоянный полный' | 'Полный подключаемый';
export interface EngineCapacity{
    min: number;
    max: number;
}
//type TransmissionType = 'МКПП' | 'АКПП' | 'Робот' | 'Вариатор';
export interface YearOfProduction{
    min: number;
    max: number;
}

//type Condition = 'Новый' | 'Б/у' | 'Аварийный' | 'На запчасти';

export interface Commission {
    min: number;
    max: number;
}
export interface Price {
    min: number;
    max: number;
}
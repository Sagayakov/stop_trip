export interface TypeSettingTaxi {
    region: string[];
    city: string[];
    taxi_unit: string[];
    taxi_type: string[];
    price: Price;
}
export interface SelectOption {
    value: string;
    label: string;
}

interface Price {
    min: number;
    max: number;
}

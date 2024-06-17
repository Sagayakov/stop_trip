export interface TypeOfServicesForm {
    region: string[];
    city: string[];
    service_home_visit: boolean;
    price: Price;
}

export interface Price {
    min: number;
    max: number;
}

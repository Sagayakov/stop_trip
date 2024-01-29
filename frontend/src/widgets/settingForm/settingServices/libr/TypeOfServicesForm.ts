export interface TypeOfServicesForm {
    city: string[];
    service_home_visit: boolean;
    price: Price;
}

interface Price {
    min: number;
    max: number;
}

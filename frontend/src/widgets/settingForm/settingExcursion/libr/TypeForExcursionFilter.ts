export interface TypeForExcursionFilter {
    region: string[];
    city: string[];
    excursion_food: boolean;
    excursion_transfer: boolean;
    price: Price;
}

export interface Price {
    min: number;
    max: number;
}

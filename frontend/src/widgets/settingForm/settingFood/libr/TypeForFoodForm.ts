export interface TypeForFoodForm {
    region: string[];
    city: string[];
    food_delivery: boolean;
    food_establishment: boolean;
    food_type: string[];
    price: Price;
}
export interface Price {
    min: number;
    max: number;
}

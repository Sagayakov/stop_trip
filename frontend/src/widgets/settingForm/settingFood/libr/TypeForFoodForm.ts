export interface TypeForFoodForm {
    city: string[];
    food_delivery: boolean;
    food_establishment: boolean;
    food_type: FoodType;
}
type FoodType = {
    label: string;
    value: string;
};

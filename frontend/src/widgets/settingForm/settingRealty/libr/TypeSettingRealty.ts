export interface TypeSettingRealty {
    city: string[];
    property_type_of_service: string[];
    region: string;
    property_house_type: string[];
    property_floor: number;
    property_rental_condition: string[];
    price: Price;
    property_type: string[];
    property_area: TotalArea;
    property_living_area: LivingSpace;
    property_sleeping_places: SleepingPlaces;
    property_has_furniture: boolean;
    property_amenities: string[];
    property_rooms_count: RoomsCount;
    property_bathroom_type: string[];
    property_bathroom_count: BathroomCount;
    property_balcony: string[];
    property_has_parking: boolean;
    property_commission: Commission;
    property_prepayment: string[];
}

export interface SelectOption {
    value: string;
    label: string;
}

export interface Price {
    limit: Limit;
    min: number;
    max: number;
}
export type Limit = null | '15000' | '30000';

export interface RoomsCount {
    min: number;
    max: number;
}
export interface TotalArea {
    min: number;
    max: number;
}

export interface LivingSpace {
    min: number;
    max: number;
}
export interface SleepingPlaces {
    min: number;
    max: number;
}
export interface BathroomCount {
    min: number;
    max: number;
}

export interface Commission {
    min: number;
    max: number;
}

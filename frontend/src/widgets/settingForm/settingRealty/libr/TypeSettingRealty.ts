export interface TypeSettingRealty {
    property_type_of_service: string[];
    property_city: string[];
    property_district: string[];
    property_house_type: string[];
    property_floor: number;
    //typeOfProperty: string[];
    property_rental_condition: string[];
    price: Price;
    property_area: TotalArea;
    property_living_area: LivingSpace;
    property_sleeping_places: number;
    property_has_furniture: boolean;
    property_amenities: string,
    property_rooms_count: string[];
    property_bathroom_type: string[];
    property_bathroom_count: number;
    property_balcony: string;
    //onlyWithPhotos: boolean;
    property_has_parking: boolean;
    property_commission: Commission;
    property_prepayment: string[];
}

// type TypeOfProperty = 'Квартира' | 'Комната' | 'Дом'
export interface SelectOption {
    value: string;
    label: string;
}

export interface Price {
    adverts: Adverts;
    min: number;
    max: number;
}
type Adverts = null | '100' | '500' | '1000';

export interface TotalArea {
    min: number;
    max: number;
}

export interface LivingSpace {
    min: number;
    max: number;
}

//type RoomsQuantity = 1 | 2 | 3 | 4;
//type BathRoom = 'separate' | 'combined';

export interface Commission{
    min: number;
    max: number;
}
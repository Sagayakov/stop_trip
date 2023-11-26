export interface TypeSettingRealty {
    typeOfService: string[];
    propertyCity: string[];
    propertyDistrict: string[];
    houseType: string[];
    typeOfProperty: string[];
    rentalCondition: string[];
    settingPrice: Price;
    totalArea: TotalArea;
    livingSpace: LivingSpace;
    sleepingPlaces: number;
    hasFurniture: boolean;
    amenities: string,
    roomsQuantity: RoomsQuantity;
    bathRoom: BathRoom;
    bathroomQuantity: number;
    balcony: boolean;
    onlyWithPhotos: boolean;
    comission: Comission;
}

// type TypeOfProperty = 'Квартира' | 'Комната' | 'Дом'
export interface SelectOption {
    value: string;
    label: string;
}

interface Price {
    adverts: Adverts
    min: number
    max: number
}
type Adverts = null | '100' | '500' | '1000'

interface TotalArea {
    min: number;
    max: number;
}

interface LivingSpace {
    min: number;
    max: number;
}

type RoomsQuantity = 1 | 2 | 3 | 4
type BathRoom = 'separate' | 'combined'

interface Comission{
    min: number
    max: number
}
export interface TypeSettingAdverts {
    typeOfProperty: TypeOfProperty
    settingPrice: Price
    totalArea: TotalArea
    livingSpace: LivingSpace
    roomsQuantity: RoomsQuantity
    bathRoom: BathRoom
    balcony: boolean
    onlyWithPhotos: boolean
}

type TypeOfProperty = 'Не выбрано' | 'Квартира' | 'Комната' | 'Дом'

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
export interface TypeSettingTaxi {
    unitOfMeasurement: string[]
    typeOfTaxi: string[]
    price: Price
}
export interface SelectOption {
    value: string;
    label: string;
}

interface Price{
    min: number
    max: number
}
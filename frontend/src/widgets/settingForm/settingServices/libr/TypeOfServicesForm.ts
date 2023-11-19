export interface TypeOfServicesForm {
    houseCall: boolean
    price: Price
}

interface Price {
    min: number
    max: number
}
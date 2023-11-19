export interface TypeOfEventFilter {
    start: TypeDate;
    end: TypeDate;
    isOnline: boolean
    price: Price
}

interface TypeDate{
    date: Date
    time: string
}
interface Price{
    min: number
    max: number
}
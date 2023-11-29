export interface TypeOfEventFilter {
    start_date: TypeDate;
    end_date: TypeDate;
    is_online: boolean
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
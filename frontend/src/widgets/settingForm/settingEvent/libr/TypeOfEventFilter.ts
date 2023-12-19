export interface TypeOfEventFilter {
    start_date: TypeDate;
    end_date: TypeDate;
    is_online: boolean
    price: Price
}

export interface TypeDate{
    date: Date
    time: string
}
export interface Price{
    min: number
    max: number
}
export interface TypeOfEventFilter {
    region: string[];
    city: string[];
    start_date: TypeDate;
    end_date: TypeDate;
    is_online: boolean;
    price: Price;
}

export interface TypeDate {
    date: string;
    time: string;
}
export interface Price {
    min: number;
    max: number;
}

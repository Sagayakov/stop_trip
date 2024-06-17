export interface TypeOfCurrencyFilter {
    region: string[];
    city: string[];
    proposed_currency: string;
    exchange_for: string;
    exchange_rate: Rate;
}

export interface Rate {
    min: number;
    max: number;
}

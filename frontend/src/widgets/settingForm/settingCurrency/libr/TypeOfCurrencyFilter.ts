export interface TypeOfCurrencyFilter {
    city: string[];
    proposed_currency: Currency[];
    exchange_for: Currency[];
    exchange_rate: number;
}

interface Currency {
    value: string;
    label: string;
}

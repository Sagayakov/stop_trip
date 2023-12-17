export interface TypeOfCurrencyFilter {
    proposed_currency: Currency;
    exchange_for: Currency;
    exchange_rate: number;
}

interface Currency {
    value: string;
    label: string;
}

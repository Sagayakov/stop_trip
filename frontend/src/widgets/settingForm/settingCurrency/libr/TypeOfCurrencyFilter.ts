export interface TypeOfCurrencyFilter {
    proposed_currency: Currency;
    exchange_for: Currency;
    exchange_rate: number;
}

interface Currency {
    value: string;
    label: string;
}
// type Currency = {
//     1: 'Доллар';
//     2: 'Рубль';
//     3: 'Рупий';
//     4: 'Евро';
// }

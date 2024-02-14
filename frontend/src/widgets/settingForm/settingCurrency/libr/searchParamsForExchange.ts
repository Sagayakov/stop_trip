import { getMultiQuery } from 'shared/utils/getMultiQuery';

interface Currency {
    value: string;
    label: string;
}

type SearchParamsProps = {
    city?: string[];
    exchange_for?: Currency[];
    exchange_rate?: number;
    proposed_currency?: Currency[];
};

export const searchParamsForExchange = ({
    city,
    exchange_for,
    exchange_rate,
    proposed_currency,
}: SearchParamsProps) => {
    let proposedValues = '';
    try {
        if (proposed_currency) {
            proposed_currency.forEach((el) => {
                proposedValues = proposedValues + el.value + '%2C';
            });

            proposedValues = proposedValues.slice(0, proposedValues.length - 3);
        }
    } catch (error) {
        console.log(error);
    }

    const proposed = proposed_currency
        ? `&proposed_currency=${proposedValues}`
        : '';

    let exchangeFor = '';

    try {
        if (exchange_for) {
            exchange_for.forEach((el) => {
                exchangeFor = exchangeFor + el.value + '%2C';
            });
            exchangeFor = exchangeFor.slice(0, exchangeFor.length - 3);
        }
    } catch (error) {
        console.log(error);
    }

    let currencyCity = '';

    try {
        currencyCity = getMultiQuery('city', city);
    } catch (error) {
        console.log(error);
    }

    const exFor = exchange_for ? `&exchange_for=${exchangeFor}` : '';

    const rate = exchange_rate
        ? `&exchange_rate=${exchange_rate.toString().replace(/,/g, '.')}`
        : '';

    return { currencyCity, proposed, exFor, rate };
};

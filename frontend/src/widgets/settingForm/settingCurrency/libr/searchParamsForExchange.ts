import { getMultiQuery } from 'shared/utils/getMultiQuery';

interface Currency {
    value: string;
    label: string;
}

export const searchParamsForExchange = (
    city: string[],
    exchange_for: Currency,
    exchange_rate: number,
    proposed_currency: Currency
) => {
    let proposedValues = '';
    try {
        if (proposed_currency) {
            Object.entries(proposed_currency).forEach((el) => {
                proposedValues = proposedValues + el[1] + '%2C';
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
            Object.entries(exchange_for).forEach((el) => {
                exchangeFor = exchangeFor + el[1] + '%2C';
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

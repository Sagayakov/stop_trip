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
    const proposed = proposed_currency
        ? `&proposed_currency=${proposed_currency.join('%2C')}`
        : '';

    const currencyCity = getMultiQuery('city', city);

    const exFor = exchange_for
        ? `&exchange_for=${exchange_for.join('%2C')}`
        : '';

    const rate = exchange_rate
        ? `&exchange_rate=${exchange_rate.toString().replace(/,/g, '.')}`
        : '';

    return { currencyCity, proposed, exFor, rate };
};

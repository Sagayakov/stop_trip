import { getMultiQuery } from 'shared/utils/getMultiQuery';

type SearchParamsProps = {
    city?: string[];
    exchange_for?: string;
    exchange_rate?: number;
    proposed_currency?: string;
};

export const searchParamsForExchange = ({
    city,
    exchange_for,
    exchange_rate,
    proposed_currency,
}: SearchParamsProps) => {
    const proposed = proposed_currency
        ? `&proposed_currency=${proposed_currency}`
        : '';

    const currencyCity = getMultiQuery('city', city);

    const exFor = exchange_for ? `&exchange_for=${exchange_for}` : '';

    const rate = exchange_rate
        ? `&exchange_rate=${exchange_rate.toString().replace(/,/g, '.')}`
        : '';

    return { currencyCity, proposed, exFor, rate };
};

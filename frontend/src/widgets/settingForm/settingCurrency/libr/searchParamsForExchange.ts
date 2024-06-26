import { getMultiQuery } from 'shared/utils/getMultiQuery';
import { Rate } from './TypeOfCurrencyFilter';

type SearchParamsProps = {
    city?: string[];
    exchange_for?: string;
    exchange_rate?: Rate;
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

    const rateMax = exchange_rate?.max
        ? `&exchange_rate_max=${exchange_rate.max.toString().replace(/,/g, '.')}`
        : '';

    const rateMin = exchange_rate?.min
        ? `&exchange_rate_min=${exchange_rate.min.toString().replace(/,/g, '.')}`
        : '';

    return { currencyCity, proposed, exFor, rateMax, rateMin };
};

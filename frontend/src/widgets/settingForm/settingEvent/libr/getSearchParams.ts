import { getMultiQuery } from 'shared/utils/getMultiQuery.ts';
import { TypeDate, Price } from './TypeOfEventFilter.ts';

type SearchParamsProps = {
    city: string[];
    end_date: TypeDate;
    start_date: TypeDate;
    is_online: boolean;
    price: Price;
};

export const getSearchParams = ({
    city,
    end_date,
    start_date,
    is_online,
    price,
}: SearchParamsProps) => {
    const eventCity = getMultiQuery('city', city);

    const isOnlineQuery = is_online ? '&is_online=true' : '';

    const priceMaxQuery = price.max
        ? `&price_max=${price.max.toString().replace(/,/g, '.')}`
        : '';

    const priceMinQuery = price.min
        ? `&price_min=${price.min.toString().replace(/,/g, '.')}`
        : '';

    const startDateQuery = start_date.date
        ? `&start_date=${start_date.date}${
              start_date.time && `Т${end_date.time}:00%2B03${':'}00`
          }`
        : '';

    const endDateQuery = end_date.date
        ? `&end_date=${end_date.date}${
              end_date.time && `Т${start_date.time}:00%2B03${':'}00`
          }`
        : '';

    return `${eventCity}${startDateQuery}${endDateQuery}${isOnlineQuery}${priceMinQuery}${priceMaxQuery}`;
};

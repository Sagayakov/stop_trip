import { getMultiQuery } from 'shared/utils/getMultiQuery';

interface Price {
    min: number;
    max: number;
}

export const getSearchParams = (
    city: string[],
    service_home_visit: boolean,
    price: Price
) => {
    const serviceCity = getMultiQuery('city', city);
    const homeVisitQuery = service_home_visit ? `&service_home_visit=true` : '';

    const priceMaxQuery = price.max
        ? `&price_max=${price.max.toString().replace(/,/g, '.')}`
        : '';

    const priceMinQuery = price.min
        ? `&price_min=${price.min.toString().replace(/,/g, '.')}`
        : '';

    return `${serviceCity}${homeVisitQuery}${priceMinQuery}${priceMaxQuery}`;
};

import { getMultiQuery } from 'shared/utils/getMultiQuery';

interface Price {
    min: number;
    max: number;
}

type TaxiParamsProps = {
    city: string[];
    taxi_type: string[];
    taxi_unit: string[];
    price: Price;
};

export const getSearchParams = ({
    city,
    taxi_type,
    taxi_unit,
    price,
}: TaxiParamsProps) => {
    const taxiCity = getMultiQuery('city', city);

    const priceMaxQuery = price.max
        ? `&price_max=${price.max.toString().replace(/,/g, '.')}`
        : '';

    const priceMinQuery = price.min
        ? `&price_min=${price.min.toString().replace(/,/g, '.')}`
        : '';

    const taxiUnitQuery = taxi_unit ? `&taxi_unit=${taxi_unit}` : '';
    const taxiTypeQuery = getMultiQuery('taxi_type', taxi_type);

    return `${taxiCity}${taxiUnitQuery}${taxiTypeQuery}${priceMinQuery}${priceMaxQuery}`;
};

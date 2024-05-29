import { getMultiQuery } from 'shared/utils/getMultiQuery';
import { Price } from './TypeOfDocumentFilter';

export const searchParamsForDocument = (
    city: string[],
    document_duration: string[],
    document_type: string[],
    price: Price,
) => {
    const documentCity = getMultiQuery('city', city);

    const duration = document_duration
        ? `&document_duration=${document_duration.join('%2C')}`
        : '';

    const types = document_type
        ? `&document_type=${document_type.join('%2C')}`
        : '';

    const priceMaxQuery = price.max
        ? `&price_max=${price.max.toString().replace(/,/g, '.')}`
        : '';

    const priceMinQuery = price.min
        ? `&price_min=${price.min.toString().replace(/,/g, '.')}`
        : '';

    return { documentCity, duration, types, priceMaxQuery, priceMinQuery };
};

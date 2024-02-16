import { getMultiQuery } from 'shared/utils/getMultiQuery';

export const searchParamsForDocument = (
    city?: string[],
    document_duration?: string[],
    document_type?: string[]
) => {
    const documentCity = getMultiQuery('city', city);

    const duration = document_duration
        ? `&document_duration=${document_duration.join('%2C')}`
        : '';

    const types = document_type
        ? `&document_type=${document_type.join('%2C')}`
        : '';

    return { documentCity, duration, types };
};

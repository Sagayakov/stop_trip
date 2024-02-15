import { getMultiQuery } from 'shared/utils/getMultiQuery';

interface Document {
    value: string;
    label: string;
}

export const searchParamsForDocument = (
    city?: string[],
    document_duration?: Document[],
    document_type?: Document[]
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

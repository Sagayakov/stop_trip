import { getMultiQuery } from 'shared/utils/getMultiQuery';

export const searchParamsForDocument = (
    city: string[],
    document_duration: string[],
    document_type: string[]
) => {
    let documentCity = '';

    try {
        documentCity = getMultiQuery('city', city);
    } catch (error) {
        console.log(error);
    }

    let durationValues = '';

    try {
        if (document_duration) {
            Object.entries(document_duration).forEach((el) => {
                durationValues = durationValues + el[1] + '%2C';
            });
            durationValues = durationValues.slice(0, durationValues.length - 3);
        }
    } catch (error) {
        console.log(error);
    }

    const duration = document_duration
        ? `&document_duration=${durationValues}`
        : '';

    let typeValues = '';

    try {
        if (document_type) {
            Object.entries(document_type).forEach((el) => {
                typeValues = typeValues + el[1] + '%2C';
            });
            typeValues = typeValues.slice(0, typeValues.length - 3);
        }
    } catch (error) {
        console.log(error);
    }

    const types = document_type ? `&document_type=${typeValues}` : '';

    return { documentCity, duration, types };
};

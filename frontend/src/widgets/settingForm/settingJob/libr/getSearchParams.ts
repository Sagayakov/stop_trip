import { getMultiQuery } from 'shared/utils/getMultiQuery';

interface Price {
    min: number;
    max: number;
}

type JobParamsProps = {
    city: string[];
    job_type: string[];
    job_payment_type: string[];
    job_experience: boolean;
    job_duration: string[];
    price: Price;
};

export const getSearchParams = ({
    city,
    job_type,
    job_payment_type,
    job_experience,
    job_duration,
    price,
}: JobParamsProps) => {
    const jobCity = getMultiQuery('city', city);

    const priceMaxQuery = price.max
        ? `&price_max=${price.max.toString().replace(/,/g, '.')}`
        : '';

    const priceMinQuery = price.min
        ? `&price_min=${price.min.toString().replace(/,/g, '.')}`
        : '';

    const typeQuery = getMultiQuery('job_type', job_type);

    const paymentTypeQuery = getMultiQuery(
        'job_payment_type',
        job_payment_type
    );
    const experienceQuery = job_experience ? `&job_experience=true` : '';

    const durationQuery = getMultiQuery('job_duration', job_duration);

    return `${jobCity}${typeQuery}${paymentTypeQuery}${experienceQuery}${durationQuery}${priceMinQuery}${priceMaxQuery}`;
};

interface Price{
    min: number
    max: number
}
export const getSearchParams = (
    job_type: string[],
    job_payment_type: string[],
    job_experience: boolean,
    job_duration: string[],
    price: Price
) => {
    const priceMaxQuery = price.max
        ? `&price_max=${price.max.toString().replace(/,/g, '.')}`
        : '';

    const priceMinQuery = price.min
        ? `&price_min=${price.min.toString().replace(/,/g, '.')}`
        : '';

    const typeQuery = job_type
        ? `&job_type=${job_type.map((el) => `${el}`).join(',')}`
        : '';

    const paymentTypeQuery = job_payment_type
        ? `&job_payment_type=${job_payment_type
            .map((el) => `${el}`)
            .join(',')}`
        : '';

    const experienceQuery = job_experience ? `&job_experience=true` : '';
    const durationQuery = job_duration
        ? `&job_duration=${job_duration.map((el) => `${el}`).join(',')}`
        : '';

    return `${typeQuery}${paymentTypeQuery}${experienceQuery}${durationQuery}${priceMinQuery}${priceMaxQuery}`;
};

interface Price{
    min: number;
    max: number;
}
export const getSearchParams = (taxi_type: string[], taxi_unit: string[], price: Price) => {
    const priceMaxQuery = price.max ? `&price_max=${price.max}` : '';
    const priceMinQuery = price.min ? `&price_min=${price.min}` : '';
    const taxiUnitQuery = taxi_unit ? `&taxi_unit=${taxi_unit}` : '';
    const taxiTypeQuery = taxi_type
        ? `&taxi_type=${taxi_type.map((el) => `${el}`).join(',')}`
        : '';

    return `${taxiUnitQuery}${taxiTypeQuery}${priceMinQuery}${priceMaxQuery}`
}
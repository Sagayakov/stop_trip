import { FieldValues, UseFormWatch, WatchObserver } from "react-hook-form";

interface Props<T extends FieldValues> {
    filters: string[];
    watch: UseFormWatch<T>;
}

export const getLightFiltersQuery = <T extends FieldValues>({ filters, watch }: Props<T>) => {
    const watches = filters.map((el) => watch(el as unknown as WatchObserver<T>));
    const query = filters.map((el, i) => watches[i] ? `${el}=${watches[i]}` : null);
    query.unshift('region=north-goa');
    return query.join('&')
};

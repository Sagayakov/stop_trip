import { RangeType } from "app/api/types/filtersType";
import { FieldValues, UseFormWatch, WatchObserver } from "react-hook-form";

interface Props<T extends FieldValues> {
    filters: string[];
    watch: UseFormWatch<T>;
}

export const getLightFiltersQuery = <T extends FieldValues>({ filters, watch }: Props<T>) => {
    const watches = filters.map((el) => watch(el as unknown as WatchObserver<T>));
    const query = filters.map((el, i) => {
        if (el === 'price') {
            let result = '';
            if ((watches[i] as unknown as RangeType).min) {
               result += `${el}_min=${(watches[i] as unknown as RangeType).min}`;
            }
            if ((watches[i] as unknown as RangeType).max) {
                result += `${el}_max=${(watches[i] as unknown as RangeType).max}`;
             }
            return result;
        }
        return watches[i] ? `${el}=${watches[i]}` : null;
    });
    return query.filter((el) => !!el).join('&')
};

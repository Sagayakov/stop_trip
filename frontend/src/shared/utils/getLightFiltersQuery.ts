import { RangeType } from "app/api/types/filtersType";
import { FieldValues, UseFormWatch, WatchObserver } from "react-hook-form";
import { TypeDate } from "widgets/settingForm/settingEvent/libr/TypeOfEventFilter";

interface Props<T extends FieldValues> {
    filters: string[];
    watch: UseFormWatch<T>;
}

export const getLightFiltersQuery = <T extends FieldValues>({ filters, watch }: Props<T>) => {
    const watches = filters.map((el) => watch(el as unknown as WatchObserver<T>));
    const query = filters.map((el, i) => {
        console.log(watches[i]);
        if (watches[i]) {
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
            if ((el === 'start_date' || el === 'end_date')) {
                if ((watches[i] as unknown as TypeDate).date) {
                    const value = watches[i] as unknown as TypeDate;
                    return `${el}=${value.date}${value.time && `Т${value.time}:00%2B03${':'}00`}`;
                }
                return null;
            }
            return `${el}=${watches[i]}`;
        }
        return null;
    });
    return query.filter((el) => !!el).join('&')
};

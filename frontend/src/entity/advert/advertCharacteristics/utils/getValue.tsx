import { FiltersType, SelectType } from 'app/api/types/filtersType';
import { ValueType } from './types';
import { Amenity, ProductType } from 'pages/advertPage/libr/types';
import { getEventDate } from 'shared/utils/getEventDate';
import styles from '../advertCharacteristics.module.scss';

export const getValue = (
    key: string,
    value: ValueType,
    filtersData: FiltersType,
    lang: 'ru' | 'en'
) => {
    if (key === 'property_amenities') {
        return (value as Amenity[])
            .map((item) =>
                lang === 'ru'
                    ? (filtersData.property_amenities as SelectType[]).find(
                          (el) => el.value === item.slug
                      )?.label
                    : (filtersData.property_amenities as SelectType[]).find(
                          (el) => el.value === item.slug
                      )?.value
            )
            .join(', ');
    } else if (key === 'start_date' || key === 'end_date') {
        const date = getEventDate(value as string);
        return (
            <div key={key} className={styles.event_date}>
                <span>{date.day}</span>
                <span>{date.time}</span>
            </div>
        );
    } else {
        if (
            filtersData[key as keyof ProductType] &&
            Array.isArray(filtersData[key as keyof ProductType]) &&
            value !== true
        ) {
            const result = (
                filtersData[key as keyof ProductType] as SelectType[]
            ).find((el) => el.value === value);

            return lang === 'ru'
                ? result?.label
                : `${(result?.value as string)[0].toUpperCase()}${(
                      result?.value as string
                  ).slice(1)}`;
        } else {
            return value as string | number | boolean | null;
        }
    }
};

import { FiltersType, SelectType } from 'app/api/types/filtersType';
import { ValueType } from './types';
import { Amenity, ProductType } from 'pages/advertPage/libr/types';
import { getEventDate } from 'shared/utils/getEventDate';
import styles from '../advertCharacteristics.module.scss';

export const getValue = (
    key: string,
    value: ValueType,
    filtersData: FiltersType
) => {
    if (key === 'property_amenities') {
        return (value as Amenity[])
            .map(
                (item) =>
                    (filtersData.property_amenities as SelectType[]).find(
                        (el) => el.value === item.slug
                    )?.label
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
        return filtersData[key as keyof ProductType] &&
            Array.isArray(filtersData[key as keyof ProductType])
            ? (filtersData[key as keyof ProductType] as SelectType[]).find(
                  (el) => el.value === value
              )?.label
            : (value as string | number | boolean | null);
    }
};

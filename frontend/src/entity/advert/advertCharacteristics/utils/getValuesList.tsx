import { ProductType } from 'pages/advertPage/libr/types.ts';
import { Categories } from 'shared/const/categories.tsx';
import {
    categoryCharacteristicsKeys,
    categoryCharacteristicsValues,
} from 'shared/const/categoryCharacteristics.ts';
import { useTranslation } from 'react-i18next';
import { getEventDate } from 'shared/utils/getEventDate';
import styles from '../advertCharacteristics.module.scss';
import { unInformative } from './unInformativeFields';

type GetListProps = {
    data: ProductType;
    category: Categories;
};

export const GetValuesList = ({ data, category }: GetListProps) => {
    const { t } = useTranslation();

    const list = [];

    let key: keyof ProductType;
    for (key in data) {
        if (key === 'property_amenities') {
            if (data.property_amenities.length) {
                list.push(
                    <div key={key}>
                        <p>{data[key].map((el) => el.name).join(', ')}</p>
                    </div>
                );
            } else {
                continue;
            }
        } else if (
            key === 'exchange_for' ||
            key === 'proposed_currency' ||
            key === 'transport_brand' ||
            key === 'transport_model'
        ) {
            list.push(
                <div key={key}>
                    <p>{data[key]}</p>
                </div>
            );
        } else if (
            !data[key] ||
            data[key] === '' ||
            unInformative.includes(key) ||
            key === 'owner' ||
            key === 'city' ||
            key === 'property_city' ||
            key === 'images' ||
            key === 'is_published' ||
            key === 'country' ||
            key === 'region'
        ) {
            continue;
        } else if (
            key === 'service_home_visit' ||
            key === 'is_online' ||
            key === 'job_experience' ||
            key === 'property_has_furniture' ||
            key === 'property_has_parking' ||
            key === 'excursion_food' ||
            key === 'excursion_transfer' ||
            key === 'food_delivery' ||
            key === 'food_establishment'
        ) {
            list.push(
                <div key={key}>
                    <p>{data[key] === true && `${t('filters.yes')}`}</p>
                </div>
            );
        } else if (key === 'start_date' || key === 'end_date') {
            const date = getEventDate(data[key] as string);
            list.push(
                <div key={key} className={styles.event_date}>
                    <span>{data[key] && date.day}</span>
                    <span>{data[key] && date.time}</span>
                </div>
            );
        } else {
            list.push(
                <div key={key}>
                    {categoryCharacteristicsKeys[category][key] &&
                        data[key] && (
                            <p>
                                {typeof data[key] === 'number'
                                    ? data[key]
                                    : categoryCharacteristicsValues[category][
                                          key
                                      ][data[key]!]}
                            </p>
                        )}
                </div>
            );
        }
    }

    return list;
};

import { ProductType } from 'pages/advertPage/libr/types.ts';
import { Categories } from 'shared/const/categories.tsx';
import { categoryCharacteristicsKeys } from 'shared/const/categoryCharacteristics.ts';
import { useTranslation } from 'react-i18next';
import styles from '../advertCharacteristics.module.scss';

type GetListProps = {
    data: ProductType;
    category: Categories;
};

export const GetKeysList = ({ data, category }: GetListProps) => {
    const { t } = useTranslation();

    const list = [];

    let key: keyof ProductType;
    for (key in data) {
        if (
            key === 'images' ||
            key === 'is_published' ||
            key === 'taxi_unit' ||
            data[key] === '' ||
            !data[key] ||
            !categoryCharacteristicsKeys[category][key]
        ) {
            continue;
        } else if (key === 'property_amenities') {
            if (data.property_amenities.length) {
                list.push(
                    <p key={key}>
                        {t('filters.property_amenities')}
                        <span className={styles.dashes}></span>
                    </p>
                );
            } else {
                continue;
            }
        } else if (
            key === 'service_home_visit' ||
            key === 'is_online' ||
            key === 'job_experience' ||
            key === 'property_has_furniture' ||
            key === 'property_has_parking'
        ) {
            if (data[key] === true) {
                list.push(
                    <p key={key}>
                        {t(`filters.${key}`)}
                        <span className={styles.dashes}></span>
                    </p>
                );
            } else {
                continue;
            }
        } else {
            list.push(
                <p key={key} className={styles.key}>
                    {t(`filters.${key}`)}
                    <span className={styles.dashes}></span>
                </p>
            );
        }
    }

    return list;
};

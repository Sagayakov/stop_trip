import { ProductType } from 'pages/advertPage/libr/types.ts';
import { Categories } from 'shared/const/categories.tsx';
import {
    categoryCharacteristicsKeys,
    categoryCharacteristicsValues,
} from 'shared/const/categoryCharacteristics';
import { useTranslation } from 'react-i18next';

type GetListProps = {
    data: ProductType;
    category: Categories;
};

export const GetValuesList = ({ data, category }: GetListProps) => {
    const { t } = useTranslation();

    const list = [];

    let key: keyof ProductType;
    for (key in data) {
        if (
            key === 'images' ||
            key === 'is_published' ||
            data[key] === '' ||
            key === 'owner' ||
            key === 'property_city'
        ) {
            continue;
        } else if (key === 'property_amenities') {
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
            key === 'home_visit' ||
            key === 'is_online' ||
            key === 'job_experience' ||
            key === 'property_has_furniture' ||
            key === 'property_has_parking' ||
            key === 'service_home_visit'
        ) {
            list.push(
                <div key={key}>
                    <p>{data[key] === true && `${t('filters.yes')}`}</p>
                </div>
            );
        } else if (key === 'start_date' || key === 'end_date') {
            list.push(
                <div key={key}>
                    <p>{data[key]}</p>
                </div>
            );
        } else {
            list.push(
                <div key={key}>
                    {categoryCharacteristicsKeys[category][key] &&
                        data[key] !== null && (
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

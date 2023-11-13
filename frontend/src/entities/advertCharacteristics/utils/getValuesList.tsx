import { ProductType } from '../../../pages/advertPage/libr/types';
import { Categories } from '../../../shared/const/categories';
import {
    categoryCharacteristicsKeys,
    categoryCharacteristicsValues,
} from '../../../shared/const/categoryCharacteristics';

type GetListProps = {
    data: ProductType;
    category: Categories;
};

export const getValuesList = ({ data, category }: GetListProps) => {
    const list = [];

    let key: keyof ProductType;
    for (key in data) {
        if (key === 'images' || key === 'is_published' || data[key] === '') {
            continue;
        } else if (key === 'property_amenities') {
            if (data.property_amenities.length) {
                list.push(
                    <div key={key}>
                        <p>{data[key].join(', ')}</p>
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
            key === 'property_has_parking'
        ) {
            list.push(
                <div key={key}>
                    <p>{data[key] === true && 'Да'}</p>
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

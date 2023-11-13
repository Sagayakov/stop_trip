import { ProductType } from '../../../pages/advertPage/libr/types';
import { Categories } from 'shared/const/categories';
import { categoryCharacteristicsKeys } from '../../../shared/const/categoryCharacteristics';

type GetListProps = {
    data: ProductType;
    category: Categories;
};

export const getKeysList = ({ data, category }: GetListProps) => {
    const list = [];

    let key: keyof ProductType;
    for (key in data) {
        if (
            key === 'images' ||
            key === 'is_published' ||
            data[key] === '' ||
            !data[key] ||
            !categoryCharacteristicsKeys[category][key]
        ) {
            continue;
        } else if (key === 'property_amenities') {
            if (data.property_amenities.length) {
                list.push(
                    <p key={key}>
                        Удобства
                        <span className="dashes"></span>
                    </p>
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
            if (data[key] === true) {
                list.push(
                    <p key={key}>
                        {categoryCharacteristicsKeys[category][key]}
                        <span className="dashes"></span>
                    </p>
                );
            } else {
                continue;
            }
        } else {
            list.push(
                <p key={key} className={key}>
                    {categoryCharacteristicsKeys[category][key]}
                    <span className="dashes"></span>
                </p>
            );
        }
    }

    return list;
};

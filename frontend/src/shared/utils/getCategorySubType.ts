import { categorySubTypesDictionary } from 'shared/const/categorySubTypesDictionary.ts';
import { ProductType } from 'pages/advertPage/libr/types.ts';

export const getCategorySubType = (
    data: ProductType
): keyof typeof categorySubTypesDictionary | null => {
    let categorySubType: keyof typeof categorySubTypesDictionary | null = null;

    switch (
        data.category //доработать, если на бэке появятся другие типы
    ) {
        case 'transport':
            categorySubType = data.transport_category;
            break;
        case 'property':
            categorySubType = data.property_house_type;
            break;
        case 'job':
            categorySubType = data.job_type;
            break;
        case 'taxi':
            categorySubType = data.taxi_type;
            break;
        default:
            categorySubType = null;
    }

    return categorySubType;
};

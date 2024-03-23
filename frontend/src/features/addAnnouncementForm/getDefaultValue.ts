import { AvailableValuesType } from 'app/api/types/lastAdvertsTypes';

interface SelectOption {
    value: string | number | null | boolean;
    label: string | number | null | boolean;
}
interface Values {
    label: string | number;
    value: string | number;
}
type ValueListType = Values[] | SelectOption[] | undefined;

export const getDefaultValue = (
    defaultValue: string | number | null | undefined,
    valueList: ValueListType
) => {
    if (defaultValue) {
        if (valueList) {
            return valueList.find((el) => el.value === defaultValue);
        } else {
            return { value: ' ', label: ' ' };
        }
    }
};

export const getDefaultBrand = (
    defaultValue: string | null | undefined,
    valueList: AvailableValuesType[]
) => {
    if (defaultValue) {
        if (valueList) {
            const result = valueList.find((el) => el.slug === defaultValue);
            return { value: result?.slug, label: result?.name };
        } else {
            return { value: ' ', label: ' ' };
        }
    }
};

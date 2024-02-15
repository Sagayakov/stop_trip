import { Control, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown';
import { TypeForFoodForm } from 'widgets/settingForm/settingFood/libr/TypeForFoodForm.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingFood/libr/settingFoordForm.module.scss';
import { useEffect, useState } from 'react';
import { useGetFiltersQuery } from 'app/api/fetchAdverts';

interface Props {
    setValue: UseFormSetValue<TypeForFoodForm>;
    control: Control<TypeForFoodForm, string[]>;
}

type SelectType = {
    value: string;
    label: string;
};

export const FoodType = ({ control, setValue }: Props) => {
    const { t } = useTranslation();
    const { data } = useGetFiltersQuery('');
    const [typeValues, setTypeValues] = useState<SelectType[]>([]);

    useEffect(() => {
        if (data) {
            const result = (data['taxi_type'] as SelectType[]).filter(
                (el) => (el as SelectType).value && (el as SelectType).label
            );
            data && setTypeValues(result as SelectType[]);
        }
    }, [data]);

    return (
        <div className={styles.foodType}>
            <h3>{t('filters.food_type')}</h3>
            <UniversalSelectDropdown<TypeForFoodForm>
                closeMenuOnSelect={false}
                control={control}
                isMulti={true}
                name="food_type"
                options={typeValues}
                placeholder={t('filters.food_type')}
                prefix="filterForm"
                setValue={setValue}
            />
        </div>
    );
};

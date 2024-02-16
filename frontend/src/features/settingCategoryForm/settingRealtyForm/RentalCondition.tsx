import { Control, UseFormSetValue } from 'react-hook-form';
import { TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss';

interface Props {
    setValue: UseFormSetValue<TypeSettingRealty>;
    control: Control<TypeSettingRealty, string[]>;
}

type SelectType = {
    value: string;
    label: string;
};

export const RentalCondition = ({ control, setValue }: Props) => {
    const { data } = useGetFiltersQuery('');
    const [rentalValues, setRentalValues] = useState<SelectType[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        if (data) {
            const result = (
                data['property_rental_condition'] as SelectType[]
            ).filter(
                (el) => (el as SelectType).value && (el as SelectType).label
            );
            data && setRentalValues(result as SelectType[]);
        }
    }, [data]);

    return (
        <>
            <div className={styles.rentalCondition}>
                <h3>{t('filters.property_rental_condition')}</h3>
                <UniversalSelectDropdown<TypeSettingRealty>
                    setValue={setValue}
                    control={control}
                    name="property_rental_condition"
                    prefix="filterForm"
                    placeholder={t('filters.property_rental_condition')}
                    closeMenuOnSelect={false}
                    isMulti={true}
                    options={rentalValues}
                />
            </div>
        </>
    );
};

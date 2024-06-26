import { Control, UseFormSetValue } from 'react-hook-form';
import { TypeSettingRealty, Price } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss';
import { useAppSelector } from 'app/store/hooks';
import { getDashOptions } from 'shared/utils';

interface Props {
    setValue: UseFormSetValue<TypeSettingRealty>;
    control: Control<TypeSettingRealty, string[]>;
    available_params: string[] | { min: number; max: number } | Price | undefined;
}

type SelectType = {
    value: string;
    label: string;
};

export const RentalCondition = ({ control, setValue, available_params }: Props) => {
    const { data } = useGetFiltersQuery('');
    const [rentalValues, setRentalValues] = useState<SelectType[]>([]);
    const { t } = useTranslation();
    const lang = useAppSelector((state) => state.setLang.lang);

    useEffect(() => {
        if (data && available_params) {
            const result = (
                data['property_rental_condition'] as SelectType[]
            ).filter((el) => (available_params as string[]).includes(el.value));
            setRentalValues(result as SelectType[]);
        }
    }, [data, available_params]);

    const options = getDashOptions(lang, rentalValues);

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
                    options={options}
                    defaultValue={options.length === 1 ? options[0] : undefined}
                />
            </div>
        </>
    );
};

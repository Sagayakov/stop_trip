import { Control, UseFormSetValue } from 'react-hook-form';
import { TypeSettingRealty, Price } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss';
import { useAppSelector } from 'app/store/hooks';
import { getCityOptions } from 'shared/utils';

interface Props {
    setValue: UseFormSetValue<TypeSettingRealty>;
    control: Control<TypeSettingRealty, string[]>;
    available_params: string[] | { min: number; max: number } | Price | undefined;
}

type SelectOption = {
    value: string;
    label: string;
};

export const City = ({ control, setValue, available_params }: Props) => {
    const { data } = useGetFiltersQuery('');
    const [cityValues, setCityValues] = useState<SelectOption[]>([]);
    const { t } = useTranslation();
    const lang = useAppSelector((state) => state.setLang.lang);

    useEffect(() => {
        if (data && available_params) {
            const result = (data['city'] as SelectOption[]).filter((el) =>
                (available_params as string[]).includes(
                    el.value
                )
            );

            setCityValues(result as SelectOption[]);
        }
    }, [data, available_params]);

    const options = getCityOptions(lang, cityValues);

    return (
        <>
            <div className={styles.propertyCity}>
                <h3>{t('filters.property_city')}</h3>
                <UniversalSelectDropdown<TypeSettingRealty>
                    setValue={setValue}
                    control={control}
                    name="city"
                    prefix="filterForm"
                    placeholder={t('filters.property_city')}
                    closeMenuOnSelect={false}
                    isMulti={true}
                    options={options}
                    defaultValue={options.length === 1 ? options[0] : undefined}
                />
            </div>
        </>
    );
};

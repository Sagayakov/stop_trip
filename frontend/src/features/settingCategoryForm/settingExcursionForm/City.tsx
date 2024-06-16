import { Control, UseFormSetValue } from 'react-hook-form';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import styles from 'widgets/settingForm/settingExcursion/libr/settingExcursionFilter.module.scss';
import { TypeForExcursionFilter, Price } from 'widgets/settingForm/settingExcursion/libr/TypeForExcursionFilter';
import { useAppSelector } from 'app/store/hooks';
import { getCityOptions } from 'shared/utils';

interface Props {
    setValue: UseFormSetValue<TypeForExcursionFilter>;
    control: Control<TypeForExcursionFilter, string[]>;
    available_params: string[] | Price | undefined;
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
                <UniversalSelectDropdown<TypeForExcursionFilter>
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

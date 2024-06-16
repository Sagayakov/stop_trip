import { Control, UseFormSetValue } from 'react-hook-form';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import styles from 'widgets/settingForm/settingEvent/libr/settingEventFilter.module.scss';
import { TypeOfEventFilter, Price } from 'widgets/settingForm/settingEvent/libr/TypeOfEventFilter';
import { useAppSelector } from 'app/store/hooks';
import { getCityOptions } from 'shared/utils';

interface Props {
    setValue: UseFormSetValue<TypeOfEventFilter>;
    control: Control<TypeOfEventFilter, string[]>;
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
            data && setCityValues(result as SelectOption[]);
        }
    }, [data, available_params]);

    const options = getCityOptions(lang, cityValues);

    return (
        <>
            <div className={styles.propertyCity}>
                <h3>{t('filters.property_city')}</h3>
                <UniversalSelectDropdown<TypeOfEventFilter>
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

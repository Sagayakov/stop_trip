import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Control, FieldValues, Path, UseFormSetValue } from 'react-hook-form';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import { useAppSelector } from 'app/store/hooks';
import { getCityOptions } from 'shared/utils';
import styles from './cityFilter.module.scss';

interface Props<T extends FieldValues> {
    setValue: UseFormSetValue<T>;
    control: Control<T, string[]>;
    available_params: string[] | Price | undefined;
}

interface Price {
    min: number;
    max: number;
}

type SelectOption = {
    value: string;
    label: string;
};

export const CityFilter = <T extends FieldValues>({ control, setValue, available_params }: Props<T>) => {
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
                <h3 className={styles.heading}>{t('filters.property_city')}</h3>
                <UniversalSelectDropdown<T>
                    setValue={setValue}
                    control={control}
                    name={"city" as Path<T>}
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

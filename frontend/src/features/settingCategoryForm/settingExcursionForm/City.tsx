import { Control, UseFormSetValue } from 'react-hook-form';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { SelectType } from 'app/api/types/filtersType.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import styles from 'widgets/settingForm/settingExcursion/libr/settingExcursionFilter.module.scss';
import { TypeForExcursionFilter } from 'widgets/settingForm/settingExcursion/libr/TypeForExcursionFilter';

interface Props {
    setValue: UseFormSetValue<TypeForExcursionFilter>;
    control: Control<TypeForExcursionFilter, string[]>;
}

export const City = ({ control, setValue }: Props) => {
    const { data } = useGetFiltersQuery('');
    const [cityValues, setCityValues] = useState<SelectType[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        if (data) {
            const result = (data['city'] as SelectType[]).filter(
                (el) => (el as SelectType).value && (el as SelectType).label
            );
            data && setCityValues(result as SelectType[]);
        }
    }, [data]);

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
                    options={cityValues}
                />
            </div>
        </>
    );
};

import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import {
    useGetAvailableFiltersQuery,
    useGetFiltersQuery,
} from 'app/api/fetchAdverts.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import styles from 'widgets/settingForm/settingJob/libr/settingJobFilter.module.scss';
import { TypesOfJobs } from 'widgets/settingForm/settingJob/libr/TypesOfJobs';

interface Props {
    setValue: UseFormSetValue<TypesOfJobs>;
    control: Control<TypesOfJobs, string[]>;
    watch: UseFormWatch<TypesOfJobs>;
}

type SelectOption = {
    value: string;
    label: string;
};

export const City = ({ control, setValue, watch }: Props) => {
    const { data } = useGetFiltersQuery('');
    const [cityValues, setCityValues] = useState<SelectOption[]>([]);
    const { t } = useTranslation();
    const region = watch('region');
    const { data: availableData } = useGetAvailableFiltersQuery(
        `?region=${region || 'north-goa'}`
    );

    useEffect(() => {
        if (data && availableData) {
            const result = (data['city'] as SelectOption[]).filter((el) =>
                (availableData.available_params.city as string[]).includes(
                    el.value
                )
            );
            setCityValues(result as SelectOption[]);
        }
    }, [data, availableData]);

    return (
        <>
            <div className={styles.propertyCity}>
                <h3>{t('filters.property_city')}</h3>
                <UniversalSelectDropdown<TypesOfJobs>
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

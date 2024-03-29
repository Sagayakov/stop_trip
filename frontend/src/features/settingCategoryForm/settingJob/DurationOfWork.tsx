import { Control, UseFormSetValue } from 'react-hook-form';
import { TypesOfJobs } from 'widgets/settingForm/settingJob/libr/TypesOfJobs.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import styles from 'widgets/settingForm/settingJob/libr/settingJobFilter.module.scss';
import { useAppSelector } from 'app/store/hooks';

interface Props {
    setValue: UseFormSetValue<TypesOfJobs>;
    control: Control<TypesOfJobs, string[]>;
}

type SelectType = {
    value: string;
    label: string;
};

export const DurationOfWork = ({ control, setValue }: Props) => {
    const { data } = useGetFiltersQuery('');
    const [durationValues, setDurationValues] = useState<SelectType[]>([]);
    const { t } = useTranslation();
    const lang = useAppSelector((state) => state.setLang.lang);

    useEffect(() => {
        if (data) {
            const result = (data['job_duration'] as SelectType[]).filter(
                (el) => (el as SelectType).value && (el as SelectType).label
            );
            data && setDurationValues(result as SelectType[]);
        }
    }, [data]);

    return (
        <>
            <div className={styles.durationOfWork}>
                <h3>{t('filters.job_duration')}</h3>
                <UniversalSelectDropdown
                    setValue={setValue}
                    control={control}
                    name="job_duration"
                    prefix="filterForm"
                    placeholder={t('filters.job_duration')}
                    closeMenuOnSelect={false}
                    isMulti={true}
                    options={
                        lang === 'ru'
                            ? durationValues
                            : durationValues.map((el) => ({
                                  value: el.value,
                                  label: `${el.value[0].toUpperCase()}${el.value.slice(
                                      1
                                  )}`,
                              }))
                    }
                />
            </div>
        </>
    );
};

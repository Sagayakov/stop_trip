import { UseFormRegister } from 'react-hook-form';
import { TypesOfJobs } from 'widgets/settingForm/settingJob/libr/TypesOfJobs.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { SelectType } from 'app/api/types/filtersType.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UniversalCheckboxGroup } from 'entity/universalEntites';
import styles from 'widgets/settingForm/settingJob/libr/settingJobFilter.module.scss';

interface Props {
    register: UseFormRegister<TypesOfJobs>;
}
interface Options {
    value: string | number;
    label: string | number;
}

export const TypeOfJob = ({ register }: Props) => {
    const { data } = useGetFiltersQuery('');
    const [typeValues, setTypeValues] = useState<Options[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        if (data) {
            const result = (data['job_type'] as SelectType[]).filter(
                (el) => (el as Options).value && (el as Options).label
            );
            data && setTypeValues(result as Options[]);
        }
    }, [data]);

    return (
        <>
            <div className={styles.typeOfJob}>
                <h3>{t('filters.job_type')}</h3>
                <UniversalCheckboxGroup
                    register={register}
                    checkboxValues={typeValues}
                    name="job_type"
                    className={styles.checkbox_group}
                />
            </div>
        </>
    );
};

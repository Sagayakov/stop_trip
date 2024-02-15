import { UseFormRegister } from 'react-hook-form';
import { TypesOfJobs } from 'widgets/settingForm/settingJob/libr/TypesOfJobs.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { SelectType } from 'app/api/types/filtersType.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UniversalCheckboxGroup } from 'entity/universalEntites';
import styles from 'widgets/settingForm/settingJob/libr/settingJobFilter.module.scss';
import { useSearchParams } from 'react-router-dom';

interface Props {
    register: UseFormRegister<TypesOfJobs>;
}
interface Options {
    value: string;
    label: string;
}

export const TypeOfJob = ({ register }: Props) => {
    const { data } = useGetFiltersQuery('');
    const [typeValues, setTypeValues] = useState<Options[]>([]);
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const [typeParams, setTypeParams] = useState<Options[] | undefined>([]);

    useEffect(() => {
        if (data) {
            const result = (data['job_type'] as SelectType[]).filter(
                (el) => (el as Options).value && (el as Options).label
            );
            setTypeValues(result as Options[]);

            const defaultParams = searchParams
                .get('job_type')
                ?.split(',')
                .map((el) => ({
                    value: el,
                    label: (data['job_type'] as Options[]).find(
                        (item) => item.value === el
                    )!.label,
                }));
            setTypeParams(defaultParams);
        }
    }, [data, searchParams]);

    return (
        <>
            <div className={styles.typeOfJob}>
                <h3>{t('filters.job_type')}</h3>
                <UniversalCheckboxGroup
                    register={register}
                    checkboxValues={typeValues}
                    name="job_type"
                    className={styles.checkbox_group}
                    defaultValue={typeParams}
                />
            </div>
        </>
    );
};

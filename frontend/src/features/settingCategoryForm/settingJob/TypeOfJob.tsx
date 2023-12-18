import { UseFormRegister } from 'react-hook-form';
import { TypesOfJobs } from 'widgets/settingForm/settingJob/libr/TypesOfJobs.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { ChoicesType } from 'app/api/types/filtersType.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UniversalCheckboxGroup } from 'entities/universalEntites';

interface Props {
    register: UseFormRegister<TypesOfJobs>;
}
interface Options{
    value: string | number
    label: string | number
}

export const TypeOfJob = ({ register }: Props) => {
    const { data } = useGetFiltersQuery('');
    const [typeValues, setTypeValues] = useState<Options[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        if (data) {
            const result = (
                data.params.find((el) => el.name === 'job_type') as ChoicesType
            ).choices.filter(
                (el) => (el as Options).value && (el as Options).label
            );
            data && setTypeValues(result as Options[]);
        }
    }, [data]);

    return (
        <>
            <div className="typeOfJob">
                <h3>{t('filters.job_type')}</h3>
                <UniversalCheckboxGroup
                    register={register}
                    checkboxValues={typeValues}
                    name="job_type"
                />
            </div>
        </>
    );
};

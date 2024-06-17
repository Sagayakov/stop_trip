import { Control, UseFormSetValue } from 'react-hook-form';
import { TypesOfJobs, Price } from 'widgets/settingForm/settingJob/libr/TypesOfJobs.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingJob/libr/settingJobFilter.module.scss';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import { useAppSelector } from 'app/store/hooks';
import { getDashOptions } from 'shared/utils';

interface Props {
    setValue: UseFormSetValue<TypesOfJobs>;
    control: Control<TypesOfJobs, string[]>;
    available_params: string[] | Price | undefined;
}

type SelectType = {
    value: string;
    label: string;
};

export const TypeOfPayment = ({ control, setValue, available_params }: Props) => {
    const { data } = useGetFiltersQuery('');
    const [values, setValues] = useState<SelectType[]>([]);
    const { t } = useTranslation();
    const lang = useAppSelector((state) => state.setLang.lang);

    useEffect(() => {
        if (data && available_params) {
            const result = (data['document_type'] as SelectType[]).filter((el) =>
                (available_params as string[]).includes(
                    el.value
                )
            );

            setValues(result as SelectType[]);
        }
    }, [data, available_params]);

    const options = getDashOptions(lang, values);

    return (
        <>
            <div className={styles.typeOfPayment}>
                <h3>{t('filters.job_payment_type')}</h3>
                <UniversalSelectDropdown
                    setValue={setValue}
                    control={control}
                    name="job_payment_type"
                    prefix="filterForm"
                    placeholder={t('filters.job_payment_type')}
                    closeMenuOnSelect={false}
                    isMulti={true}
                    options={options}
                    defaultValue={options.length === 1 ? options[0] : undefined}
                />
            </div>
        </>
    );
};

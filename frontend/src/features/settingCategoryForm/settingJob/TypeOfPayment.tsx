import { Control, UseFormSetValue } from 'react-hook-form';
import { TypesOfJobs } from 'widgets/settingForm/settingJob/libr/TypesOfJobs.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingJob/libr/settingJobFilter.module.scss';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import { useAppSelector } from 'app/store/hooks';

interface Props {
    setValue: UseFormSetValue<TypesOfJobs>;
    control: Control<TypesOfJobs, string[]>;
}

type SelectType = {
    value: string;
    label: string;
};

export const TypeOfPayment = ({ control, setValue }: Props) => {
    const { data } = useGetFiltersQuery('');
    const [paymentValues, setPaymentValues] = useState<SelectType[]>([]);
    const { t } = useTranslation();
    const lang = useAppSelector((state) => state.setLang.lang);

    useEffect(() => {
        if (data) {
            const result = (data['job_payment_type'] as SelectType[]).filter(
                (el) => (el as SelectType).value && (el as SelectType).label
            );
            data && setPaymentValues(result as SelectType[]);
        }
    }, [data]);

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
                    options={
                        lang === 'ru'
                            ? paymentValues
                            : paymentValues.map((el) => ({
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

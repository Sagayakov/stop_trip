import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown';
import { Control, FormState, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { jobValues } from './libr/jobValues';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useEffect } from 'react';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    defaultValue?: string | null | undefined;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementJobPayment = ({
    setValue,
    control,
    defaultValue,
    formState
}: Props) => {
    const paymentValues = jobValues.payment;
    const { t } = useTranslation();

    const getDefaultValue = () => {
        if (defaultValue) {
            return paymentValues.find((el) => el.value === defaultValue);
        }
    };

    useEffect(() => {
        if (defaultValue) {
            setValue('job_payment_type', getDefaultValue()!.value);
        } //если есть значение по умолчанию, устанавливаем его. Если юзер поменяет выбор, то установится новое значение
    }, []);

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.job_payment_type')}<span>*</span>:</h3>
            <UniversalSelectDropdown
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="job_payment_type"
                options={paymentValues}
                defaultValue={getDefaultValue()}
                placeholder={t('filters.job_payment_type')}
                prefix="filterAnnouncementCategory"
                setValue={setValue}
                requiredFiled={true}
            />
            <div className={styles.ann_field_err}>{formState?.errors?.job_payment_type?.message}</div>
        </div>
    );
};

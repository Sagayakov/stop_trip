import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown';
import { Control, FormState, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useEffect } from 'react';
import { useGetSelectOptionsQuery } from 'app/api/fetchAdverts.ts';

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
    const { t } = useTranslation();
    const { data } = useGetSelectOptionsQuery('');

    const getDefaultValue = () => {
        if (defaultValue) {
            return data?.job_payment_type.find((el) => el.value === defaultValue);
        }
    };

    useEffect(() => {
        if (defaultValue) {
            setValue('job_payment_type', getDefaultValue()!.value);
        } //если есть значение по умолчанию, устанавливаем его. Если юзер поменяет выбор, то установится новое значение
    }, []);

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.job_payment_type')}:</h3>
            <UniversalSelectDropdown
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="job_payment_type"
                options={data?.job_payment_type}
                defaultValue={getDefaultValue()}
                placeholder={t('filters.job_payment_type')}
                prefix="filterAnnouncementCategory"
                setValue={setValue}
            />
            <div className={styles.ann_field_err}>{formState?.errors?.job_payment_type?.message}</div>
        </div>
    );
};

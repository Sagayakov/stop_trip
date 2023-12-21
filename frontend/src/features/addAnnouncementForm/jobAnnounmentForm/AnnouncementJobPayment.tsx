import { UniversalSelectDropdown } from 'entities/universalEntites/UniversalSelectDropdown';
import { Control, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { jobValues } from './libr/jobValues';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
}

export const AnnouncementJobPayment = ({ setValue, control }: Props) => {
    const paymentValues = jobValues.payment;
    const { t } = useTranslation();

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.job_payment_type')}:</h3>
            <UniversalSelectDropdown
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="job_payment_type"
                options={paymentValues}
                placeholder={t('filters.job_payment_type')}
                prefix="filterAnnouncementCategory"
                setValue={setValue}
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};

import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: string | null | undefined;
}

export const AnnouncementEventEnd = ({ register, defaultValue }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.date-end')}:</h3>
            <input type="date" {...register('end_date')} defaultValue={defaultValue?.slice(0, 10) || ''} />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};

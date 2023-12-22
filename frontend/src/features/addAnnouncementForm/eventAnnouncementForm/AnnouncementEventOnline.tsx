import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementEventOnline = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.is_online')}:</h3>
            <label>
                <input type="checkbox" {...register('is_online')} />
                <span>{t('filters.is_online')}</span>
            </label>
            <div className={styles.ann_field_err}></div>
        </div>
    );
};

import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: boolean;
}

export const AnnouncementJobWithExp = ({ register, defaultValue }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.job_experience')}:</h3>
            <label>
                <input
                    type="checkbox"
                    {...register('job_experience')}
                    checked={defaultValue}
                    style={{ display: 'none' }}
                />
                <span>{t('filters.job_experience')}</span>
            </label>
            <div className={styles.ann_field_err}></div>
        </div>
    );
};

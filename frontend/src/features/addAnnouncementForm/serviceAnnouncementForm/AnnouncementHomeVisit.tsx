import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: boolean;
}

export const AnnouncementHomeVisit = ({ register, defaultValue }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.service_home_visit')}:</h3>
            <label>
                <input
                    type="checkbox"
                    {...register('service_home_visit')}
                    style={{ display: 'none' }}
                    checked={defaultValue}
                />
                <span>{t('filters.service_home_visit')}</span>
            </label>
            <div className={styles.ann_field_err}></div>
        </div>
    );
};

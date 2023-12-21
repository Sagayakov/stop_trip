import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementExcursionTransfer = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.excursion_transfer')}:</h3>
            <label>
                <input
                    type="checkbox"
                    {...register('excursion_transfer')}
                    style={{ display: 'none' }}
                />
                <span>{t('filters.excursion_transfer')}</span>
            </label>
            <div className={styles.ann_field_err}></div>
        </div>
    );
};

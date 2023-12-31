import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: boolean | undefined;
}

export const AnnouncementExcursionFood = ({ register, defaultValue }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.excursion_food')}:</h3>
            <label>
                <input
                    type="checkbox"
                    {...register('excursion_food')}
                    style={{ display: 'none' }}
                    checked={defaultValue}
                />
                <span>{t('filters.excursion_food')}</span>
            </label>
            <div className={styles.ann_field_err}></div>
        </div>
    );
};

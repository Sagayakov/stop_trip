import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: boolean;
}

export const AnnouncementFoodEsteblishment = ({ register, defaultValue }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={`${styles.ann_field} ${styles.ann_food}`}>
            <h3>{t('filters.food_establishment')}:</h3>
            <label className={styles.form_checkbox}>
                <input type="checkbox" {...register('food_establishment')} checked={defaultValue} />
                <span>{t('filters.food_establishment')}</span>
            </label>
            <div className={styles.ann_field_err}></div>
        </div>
    );
};

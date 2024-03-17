import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { FormState, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: boolean;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementFoodEsteblishment = ({
    register,
    defaultValue,
    formState,
}: Props) => {
    const { t } = useTranslation();

    return (
        <div className={`${styles.ann_field} ${styles.ann_food}`}>
            <h3 style={{ marginBottom: '0' }}>
                {t('filters.food_establishment')}:
            </h3>
            <label className={styles.form_checkbox}>
                <input
                    type="checkbox"
                    {...register('food_establishment')}
                    defaultChecked={defaultValue || false}
                />
                <span>{t('filters.food_establishment')}</span>
            </label>
            <div className={styles.ann_field_err}>
                {formState?.errors?.food_establishment?.message}
            </div>
        </div>
    );
};

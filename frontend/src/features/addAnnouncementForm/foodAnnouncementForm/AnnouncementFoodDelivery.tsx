import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { FormState, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
//import { useLocation } from 'react-router-dom';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: boolean;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementFoodDelivery = ({
    register,
    defaultValue,
    formState,
}: Props) => {
    const { t } = useTranslation();
    //const location = useLocation().pathname.split('/')[1];
    //const isRequired = location !== 'advertisement-editing';

    return (
        <div className={`${styles.ann_field} ${styles.ann_food}`}>
            <h3 style={{ marginBottom: '0' }}>
                {t('filters.food_delivery')}
                {/* {isRequired && <span>*</span>} */}:
            </h3>
            <label className={styles.form_checkbox}>
                <input
                    type="checkbox"
                    {...register('food_delivery', {
                        /* required: {
                            value: isRequired,
                            message: t('add-page.required'),
                        }, */
                    })}
                    defaultChecked={defaultValue || false}
                />
                <span>{t('filters.food_delivery')}</span>
            </label>
            <div className={styles.ann_field_err}>
                {formState?.errors?.food_delivery?.message}
            </div>
        </div>
    );
};

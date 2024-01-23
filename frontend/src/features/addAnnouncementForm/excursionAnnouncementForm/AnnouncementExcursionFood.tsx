import { FormState, UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: boolean | undefined;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementExcursionFood = ({ register, defaultValue, formState }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.excursion_food')}<span>*</span>:</h3>
            <label>
                <input
                    type="checkbox"
                    {...register('excursion_food', {
                        required: {
                            value: true,
                            message: t('add-page.required'),
                        },
                    })}
                    style={{ display: 'none' }}
                    checked={defaultValue}
                />
                <span>{t('filters.excursion_food')}</span>
            </label>
            <div className={styles.ann_field_err}>{formState?.errors?.excursion_food?.message}</div>
        </div>
    );
};

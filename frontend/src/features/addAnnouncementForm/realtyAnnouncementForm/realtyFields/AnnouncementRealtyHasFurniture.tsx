import { FormState, UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: boolean | null | undefined;
    formState: FormState<FormAddAnn>;
}
export const AnnouncementRealtyHasFurniture = ({ register, defaultValue, formState }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.with-furniture')}<span>*</span>:</h3>
            <div className={styles.radio_group}>
                <label>
                    <input
                        type="checkbox"
                        {...register('property_has_furniture', {
                            required: {
                                value: true,
                                message: t('add-page.required'),
                            },
                        })}
                        value="true"
                        checked={defaultValue || undefined}
                        style={{ display: 'none' }}
                    />
                    <span>{t('filters.property_has_furniture')}</span>
                </label>
            </div>
            <div className={styles.ann_field_err}>{formState?.errors?.property_has_furniture?.message}</div>
        </div>
    );
};

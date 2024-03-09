import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: boolean | null | undefined;
    errors: FieldErrors<FormAddAnn>;
}
export const AnnouncementRealtyParking = ({
    register,
    defaultValue,
    errors,
}: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.with-parking')}:</h3>
            <div className={styles.radio_group}>
                <label>
                    <input
                        type="checkbox"
                        {...register('property_has_parking')}
                        style={{ display: 'none' }}
                        checked={defaultValue || undefined}
                    />
                    <span>{t('filters.property_has_parking')}</span>
                </label>
            </div>
            <div className={styles.ann_field_err}>
                {errors?.property_has_parking &&
                    errors.property_has_parking.message}
            </div>
        </div>
    );
};

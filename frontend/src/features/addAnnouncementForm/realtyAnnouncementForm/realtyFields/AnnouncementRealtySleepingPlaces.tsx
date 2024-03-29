import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: number | null | undefined;
    errors: FieldErrors<FormAddAnn>;
}
export const AnnouncementRealtySleepingPlaces = ({
    register,
    defaultValue,
    errors,
}: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.property_sleeping_places')}:</h3>
            <div className={styles.inputNumber_group}>
                <input
                    type="text"
                    autoComplete="off"
                    defaultValue={defaultValue || ''}
                    placeholder={t('filters.count')}
                    {...register('property_sleeping_places', {
                        pattern: {
                            value: /[0-9]+/,
                            message: t('add-page.right-format'),
                        },
                        min: {
                            value: 1,
                            message: t('add-page.right-format'),
                        },
                    })}
                />
            </div>
            <div className={styles.ann_field_err}>
                {errors?.property_sleeping_places &&
                    errors.property_sleeping_places.message}
            </div>
        </div>
    );
};

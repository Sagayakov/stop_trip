import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: number | null | undefined;
    errors: FieldErrors<FormAddAnn>;
}
export const AnnouncementRealtyBathroomQuantity = ({
    register,
    defaultValue,
    errors,
}: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.property_bathroom_count')}:</h3>
            <div className={styles.inputNumber_group}>
                <input
                    type="text"
                    autoComplete="off"
                    defaultValue={defaultValue || ''}
                    placeholder={t('filters.count')}
                    {...register('property_bathroom_count', {
                        pattern: {
                            value: /[0-9]+/,
                            message: t('add-page.right-format'),
                        },
                        min: {
                            value: 0,
                            message: t('add-page.right-format'),
                        },
                    })}
                />
            </div>
            <div className={styles.ann_field_err}>
                {errors?.property_bathroom_count &&
                    errors.property_bathroom_count.message}
            </div>
        </div>
    );
};

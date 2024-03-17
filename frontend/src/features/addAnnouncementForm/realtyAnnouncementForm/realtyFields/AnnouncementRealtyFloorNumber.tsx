import { FormState, UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: number | null | undefined;
    formState: FormState<FormAddAnn>;
}
export const AnnouncementRealtyFloorNumber = ({
    register,
    defaultValue,
    formState,
}: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.ann_field}>
            <h3>
                {t('filters.property_floor')}
                <span>*</span>:
            </h3>
            <div className={styles.inputNumber_group}>
                <input
                    type="text"
                    autoComplete="off"
                    defaultValue={defaultValue || ''}
                    placeholder={t('filters.property_floor')}
                    {...register('property_floor', {
                        required: {
                            value: true,
                            message: t('add-page.required'),
                        },
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
                {formState?.errors?.property_floor?.message}
            </div>
        </div>
    );
};

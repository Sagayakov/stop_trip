import { FormState, UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue: number | null | undefined;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementRealtyRoomsQuantity = ({
    register,
    defaultValue,
    formState
}: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.ann_field}>
            <h3>
                {t('filters.property_rooms_count')}
                <span>*</span>:
            </h3>
            <div className={styles.inputNumber_group}>
                <input
                    type="text"
                    autoComplete="off"
                    pattern="[1-5]"
                    placeholder={t('add-page.from-to')}
                    defaultValue={defaultValue || ''}
                    required={true}
                    min={1}
                    max={5}
                    {...register('property_rooms_count', )}
                />
            </div>
            <div className={styles.ann_field_err}>
                {formState?.errors?.property_rooms_count?.message}
            </div>
        </div>
    );
};

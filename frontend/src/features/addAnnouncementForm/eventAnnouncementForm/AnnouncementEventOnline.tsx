import { FormState, UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: boolean;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementEventOnline = ({
    register,
    defaultValue,
    formState,
}: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.ann_field}>
            <h3 style={{ marginBottom: '0' }}>{t('filters.is_online')}:</h3>
            <label>
                <input
                    type="checkbox"
                    {...register('is_online', {})}
                    defaultChecked={defaultValue || false}
                />
                <span>{t('filters.is_online')}</span>
            </label>
            <div className={styles.ann_field_err}>
                {formState?.errors?.is_online?.message}
            </div>
        </div>
    );
};

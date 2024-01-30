import { FormState, UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'
import { useLocation } from 'react-router-dom';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: boolean;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementEventOnline = ({ register, defaultValue, formState }: Props) => {
    const { t } = useTranslation();
    const location = useLocation().pathname.split('/')[1];
    const isRequired = location !== 'advertisement-editing';

    return (
        <div className={styles.ann_field}>
            <h3 style={{marginBottom: "0"}}>{t('filters.is_online')}{isRequired && <span>*</span>}:</h3>
            <label>
                <input
                    type="checkbox"
                    {...register('is_online', {
                        required: {
                            value: isRequired,
                            message: t('add-page.required')
                        }
                    })}
                    defaultChecked={defaultValue}
                />
                <span>{t('filters.is_online')}</span>
            </label>
            <div className={styles.ann_field_err}>{formState?.errors?.is_online?.message}</div>
        </div>
    );
};

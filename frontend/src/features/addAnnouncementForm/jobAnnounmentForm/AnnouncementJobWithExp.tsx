import { FormState, UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: boolean;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementJobWithExp = ({ register, defaultValue, formState }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.job_experience')}<span>*</span>:</h3>
            <label>
                <input
                    type="checkbox"
                    {...register('job_experience', {
                        required: {
                            value: true,
                            message: t('add-page.required'),
                        },
                    })}
                    checked={defaultValue}
                    style={{ display: 'none' }}
                />
                <span>{t('filters.job_experience')}</span>
            </label>
            <div className={styles.ann_field_err}>{formState?.errors?.job_experience?.message}</div>
        </div>
    );
};

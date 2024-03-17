import { FormState, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: boolean;
    formState: FormState<FormAddAnn>;
    setValue: UseFormSetValue<FormAddAnn>;
}

export const AnnouncementJobWithExp = ({
    register,
    defaultValue,
    formState,
    setValue,
}: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.job_experience')}:</h3>
            <label>
                <input
                    type="checkbox"
                    {...register('job_experience')}
                    onChange={(event) =>
                        setValue('job_experience', event.target.checked)
                    }
                    defaultChecked={defaultValue || false}
                    style={{ display: 'none' }}
                />
                <span>{t('filters.job_experience')}</span>
            </label>
            <div className={styles.ann_field_err}>
                {formState?.errors?.job_experience?.message}
            </div>
        </div>
    );
};

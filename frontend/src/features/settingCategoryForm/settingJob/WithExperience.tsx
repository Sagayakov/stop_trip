import { UseFormRegister } from 'react-hook-form';
import { TypesOfJobs } from 'widgets/settingForm/settingJob/libr/TypesOfJobs.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingJob/libr/settingJobFilter.module.scss'

interface Props {
    register: UseFormRegister<TypesOfJobs>;
}

export const WithExperience = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.withExperience}>
            <h3>{t('filters.job_experience')}</h3>
            <div className={styles.setting_withExperience}>
                <label className="form_checkbox">
                    <input type="checkbox" {...register('job_experience')} />
                    <span>{t('filters.job_experience')}</span>
                </label>
            </div>
        </div>
    );
};

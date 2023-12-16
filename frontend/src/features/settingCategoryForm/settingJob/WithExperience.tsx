import { UseFormRegister } from 'react-hook-form';
import { TypesOfJobs } from 'widgets/settingForm/settingJob/libr/TypesOfJobs.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<TypesOfJobs>;
}

export const WithExperience = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="withExperience">
            <h3>{t('filters.job_experience')}</h3>
            <div className="setting-withExperience">
                <label className="form-checkbox">
                    <input type="checkbox" {...register('job_experience')} />
                    <span>{t('filters.job_experience')}</span>
                </label>
            </div>
        </div>
    );
};

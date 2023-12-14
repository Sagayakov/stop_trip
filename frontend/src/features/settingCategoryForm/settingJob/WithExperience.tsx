import { UseFormRegister } from 'react-hook-form';
import { TypesOfJobs } from '../../../widgets/settingForm/settingJob/libr/TypesOfJobs';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<TypesOfJobs>;
}

export const WithExperience = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="withExperience">
            <h3>{t('filters.experience')}</h3>
            <div className="setting-withExperience">
                <label className="form-checkbox">
                    <input type="checkbox" {...register('job_experience')} />
                    <span>{t('filters.experience')}</span>
                </label>
            </div>
        </div>
    );
};

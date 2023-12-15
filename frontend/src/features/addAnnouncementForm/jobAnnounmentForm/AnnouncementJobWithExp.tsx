import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementJobWithExp = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="ann-field">
            <h3>{t('filters.job_experience')}:</h3>
            <label>
                <input
                    type="checkbox"
                    {...register('job_experience')}
                    style={{ display: 'none' }}
                />
                <span>{t('filters.job_experience')}</span>
            </label>
            <div className="ann-field-err"></div>
        </div>
    );
};

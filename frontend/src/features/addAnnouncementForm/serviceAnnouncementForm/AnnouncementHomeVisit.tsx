import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementHomeVisit = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="ann-field">
            <h3>{t('filters.service_home_visit')}:</h3>
            <label>
                <input
                    type="checkbox"
                    {...register('service_home_visit')}
                    style={{ display: 'none' }}
                />
                <span>{t('filters.service_home_visit')}</span>
            </label>
            <div className="ann-field-err"></div>
        </div>
    );
};

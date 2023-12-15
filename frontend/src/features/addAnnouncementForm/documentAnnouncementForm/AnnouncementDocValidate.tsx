import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementDocValidityPeriod = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="ann-field">
            <h3>{t('filters.document_duration')}:</h3>
            <input
                type="text"
                minLength={1}
                maxLength={50}
                placeholder={t('filters.document_duration')}
                {...register('document_duration')}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};

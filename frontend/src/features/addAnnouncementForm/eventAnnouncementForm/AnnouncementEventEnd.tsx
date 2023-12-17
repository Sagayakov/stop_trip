import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementEventEnd = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="ann-field">
            <h3>{t('filters.date-end')}:</h3>
            <input type="date" {...register('end_date', { required: true })} />
            <div className="ann-field-err"></div>
        </div>
    );
};

import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}
export const AnnouncementRealtySleepingPlaces = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="ann-field">
            <h3>{t('filters.property_sleeping_places')}</h3>
            <div className="inputNumber-group">
                <input
                    type="text"
                    pattern="[0-9]*[.,]?[0-9]+"
                    autoComplete="off"
                    min={0}
                    placeholder={t('filters.count')}
                    {...register('property_sleeping_places')}
                />
            </div>
            <div className="ann-field-err"></div>
        </div>
    );
};

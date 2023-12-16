import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}
export const AnnouncementRealtyParking = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="ann-field">
            <h3>{t('filters.with-parking')}</h3>
            <div className="radio-group">
                <label>
                    <input
                        type="radio"
                        {...register('property_has_parking')}
                        style={{ display: 'none' }}
                    />
                    <span>{t('filters.property_has_parking')}</span>
                </label>
            </div>
            <div className="ann-field-err"></div>
        </div>
    );
};

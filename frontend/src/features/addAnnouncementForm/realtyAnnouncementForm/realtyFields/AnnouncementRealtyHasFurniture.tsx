import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}
export const AnnouncementRealtyHasFurniture = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="ann-field">
            <h3>{t('filters.with-furniture')}</h3>
            <div className="radio-group">
                <label>
                    <input
                        type="radio"
                        {...register('property_has_furniture')}
                        value="true"
                        style={{ display: 'none' }}
                    />
                    <span>{t('filters.property_has_furniture')}</span>
                </label>
            </div>
            <div className="ann-field-err"></div>
        </div>
    );
};

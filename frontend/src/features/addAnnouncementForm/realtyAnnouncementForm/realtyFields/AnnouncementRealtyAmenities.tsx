import { UniversalCheckboxGroup } from '../../../../entities/universalDropdown';
import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { valuesOfPropertyForm } from '../../../../widgets/settingForm/settingRealty/libr/valuesOfPropertyForm';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementRealtyAmenities = ({ register }: Props) => {
    const { t } = useTranslation();

    const optionValues = valuesOfPropertyForm.property_amenities;

    return (
        <div className="ann-field">
            <h3>{t('filters.property_amenities')}</h3>
            <UniversalCheckboxGroup
                checkboxValues={optionValues}
                name="property_amenities"
                register={register}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};

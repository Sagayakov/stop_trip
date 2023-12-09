import { UniversalCheckboxGroup } from '../../../../entities/universalDropdown';
import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { valuesOfPropertyForm } from '../../../../widgets/settingForm/settingRealty/libr/valuesOfPropertyForm';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementRealtyAmenities = ({ register }: Props) => {
    const optionValues = valuesOfPropertyForm.property_amenities;
    return (
        <div className="ann-field">
            <h3>Удобства</h3>
            <UniversalCheckboxGroup
                checkboxValues={optionValues}
                name="property_amenities"
                register={register}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};

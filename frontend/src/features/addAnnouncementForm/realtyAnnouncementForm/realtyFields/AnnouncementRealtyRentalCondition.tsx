import { Control, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from '../../../../entities/universalDropdown/UniversalSelectDropdown';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { valuesOfPropertyForm } from '../../../../widgets/settingForm/settingRealty/libr/valuesOfPropertyForm';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
}

export const AnnouncementRealtyRentalCondition = ({ setValue, control }: Props) => {
    const optionValues = valuesOfPropertyForm.property_rental_condition;
    return (
        <div className="ann-field">
            <h3>Условия аренды</h3>
            <UniversalSelectDropdown<FormAddAnn>
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="property_rental_condition"
                options={optionValues}
                placeholder="Условия аренды"
                prefix="filterAnnouncementCategory"
                setValue={setValue}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};

import { Control, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from '../../../../entities/universalDropdown/UniversalSelectDropdown';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { valuesOfPropertyForm } from '../../../../widgets/settingForm/settingRealty/libr/valuesOfPropertyForm';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
}

export const AnnouncementRealtyRentalCondition = ({ setValue, control }: Props) => {
    const optionValues = valuesOfPropertyForm.rentalCondition;
    return (
        <div className="ann-field">
            <h3>Условия аренды</h3>
            <UniversalSelectDropdown<FormAddAnn>
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="RentalCondition"
                options={optionValues}
                placeholder="Условия аренды"
                prefix="filterAnnouncementCategory"
                setValue={setValue}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};

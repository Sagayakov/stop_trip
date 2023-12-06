import { Control, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from '../../../../entities/universalDropdown/UniversalSelectDropdown';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { valuesOfPropertyForm } from '../../../../widgets/settingForm/settingRealty/libr/valuesOfPropertyForm';
import { useMatchMedia } from '../../../../app/hooks/useMatchMedia';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
}

export const AnnouncementRealtyCity = ({ setValue, control }: Props) => {
    const { isMobile } = useMatchMedia()
    const optionValues = valuesOfPropertyForm.property_city
    return (
        <div className="ann-field">
            <h3>Город</h3>
            <UniversalSelectDropdown<FormAddAnn>
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="property_city"
                options={optionValues}
                placeholder="Выберите город"
                prefix="filterAnnouncementCategory"
                setValue={setValue}
                isSearchable={!isMobile}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};

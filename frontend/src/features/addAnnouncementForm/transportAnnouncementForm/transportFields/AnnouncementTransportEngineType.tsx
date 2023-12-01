import { Control, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from '../../../../entities/universalDropdown/UniversalSelectDropdown';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { valuesOfTransportForm } from '../../../../widgets/settingForm/settingTransport/libr/valuesOfTransportForm';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
}

export const AnnouncementTransportEngineType = ({ setValue, control }: Props) => {
    const optionValues = valuesOfTransportForm.engineType;
    return (
        <div className="ann-field">
            <h3>Тип двигателя</h3>
            <UniversalSelectDropdown<FormAddAnn>
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="transportEngineType"
                options={optionValues}
                placeholder="Тип двигателя"
                prefix="filterAnnouncementCategory"
                setValue={setValue}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};


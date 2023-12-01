import { Control, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from '../../../../entities/universalDropdown/UniversalSelectDropdown';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { valuesOfTransportForm } from '../../../../widgets/settingForm/settingTransport/libr/valuesOfTransportForm';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
}

export const AnnouncementTransportModelOfTransport = ({
    setValue,
    control,
}: Props) => {
    const optionValues = valuesOfTransportForm.model;
    return (
        <div className="ann-field">
            <h3>Модель транспорта</h3>
            <UniversalSelectDropdown<FormAddAnn>
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="transportModel"
                options={optionValues}
                placeholder="Выберите модель"
                prefix="filterAnnouncementCategory"
                setValue={setValue}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};

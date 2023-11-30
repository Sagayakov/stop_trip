import { UniversalSelectDropdown } from 'entities/universalDropdown/UniversalSelectDropdown';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { UseFormSetValue, Control } from 'react-hook-form';
import { valuesOfPropertyForm } from '../../../widgets/settingForm/settingRealty/libr/valuesOfPropertyForm';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
}

export const AnnouncementTransportTranspCategory = ({
    setValue,
    control,
}: Props) => {
    const valuesTypeOfService = valuesOfPropertyForm.typeOfService;
    return (
        <div className="ann-field">
            <h3>Категория транспорта</h3>
            <UniversalSelectDropdown<FormAddAnn>
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="typeOfService"
                options={valuesTypeOfService}
                placeholder="Тип услуги"
                prefix="filterPropertyForm"
                setValue={setValue}
            />
        </div>
    );
};

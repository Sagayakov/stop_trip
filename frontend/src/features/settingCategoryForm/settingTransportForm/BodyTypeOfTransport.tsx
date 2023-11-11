import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {
    SelectOption,
    TypeSettingTransport,
} from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';
import { valuesOfTransportForm } from '../../../widgets/settingForm/settingTransport/libr/valuesOfTransportForm';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
    setValue: UseFormSetValue<TypeSettingTransport>;
}

export const BodyTypeOfTransport = ({ register, setValue }: Props) => {
    const boduTypeValue = valuesOfTransportForm.bodyType;
    const animated = makeAnimated();

    const handleChange = (
        selectedOptions: SelectOption | SelectOption[] | null
    ) => {
        if (selectedOptions) {
            const optionsArray = Array.isArray(selectedOptions)
                ? selectedOptions
                : [selectedOptions];
            const selectedValues = optionsArray
                .map((option) => option?.value)
                .filter(Boolean);
            setValue('bodyType', selectedValues);
        } else {
            setValue('bodyType', []);
        }
    };

    return (
        <div className="bodyType">
            <h3>Тип кузова</h3>
            <Select
                {...register('bodyType')}
                defaultInputValue=""
                classNamePrefix="filterTransporForm"
                id="bodyType"
                components={animated}
                closeMenuOnSelect={false}
                placeholder="Выберите категорию"
                isMulti={true}
                options={boduTypeValue}
                onChange={(selectedOptions) => {
                    handleChange(
                        selectedOptions as SelectOption | SelectOption[] | null
                    );
                }}
            />
        </div>
    );
};

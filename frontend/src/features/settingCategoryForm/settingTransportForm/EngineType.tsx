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

export const EngineType = ({ register, setValue }: Props) => {
    const engineTypeValues = valuesOfTransportForm.engineType;
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
            setValue('engineType', selectedValues);
        } else {
            setValue('engineType', []);
        }
    };

    return (
        <div className="engineType">
            <h3>Тип двигателя</h3>
            <Select
                {...register('engineType')}
                defaultInputValue=""
                classNamePrefix="filterTransporForm"
                id="engineType"
                components={animated}
                closeMenuOnSelect={false}
                placeholder="Выберите категорию"
                isMulti={true}
                options={engineTypeValues}
                onChange={(selectedOptions) => {
                    handleChange(
                        selectedOptions as SelectOption | SelectOption[] | null
                    );
                }}
            />
        </div>
    );
};

import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {
    SelectOption,
    TypeSettingTransport,
} from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';
import { valuesOfTransportForm } from '../../../widgets/settingForm/settingTransport/libr/valuesOfTransportForm';

interface Props {
    control: Control<TypeSettingTransport, string[]>;
    setValue: UseFormSetValue<TypeSettingTransport>;
}

export const EngineType = ({ control, setValue }: Props) => {
    const engineTypeValues = valuesOfTransportForm.transport_engine_type;
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
            setValue('transport_engine_type', selectedValues);
        }
    };

    return (
        <div className="engineType">
            <h3>Тип двигателя</h3>
            <Controller
                name="transport_engine_type"
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        classNamePrefix="filterTransporForm"
                        id="engineType"
                        components={animated}
                        placeholder="Тип двигателя"
                        closeMenuOnSelect={false}
                        isMulti={true}
                        options={engineTypeValues}
                        onChange={(selectedOptions) => {
                            handleChange(
                                selectedOptions as
                                    | SelectOption
                                    | SelectOption[]
                                    | null
                            );
                        }}
                        value={engineTypeValues.filter((option) =>
                            field.value?.includes(option.value)
                        )}
                    />
                )}
            />
        </div>
    );
};

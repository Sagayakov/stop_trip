import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {
    SelectOption,
    TypeSettingTransport,
} from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';
import { valuesOfTransportForm } from '../../../widgets/settingForm/settingTransport/libr/valuesOfTransportForm';

interface Props {
    setValue: UseFormSetValue<TypeSettingTransport>;
    control: Control<TypeSettingTransport, string>;
}

export const MarkOfTransport = ({ setValue, control }: Props) => {
    const markOfTrasportValues = valuesOfTransportForm.mark;
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
            setValue('mark', selectedValues);
        }
    };

    return (
        <div className="mark">
            <h3>Марка</h3>
            <Controller
                name="mark"
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        classNamePrefix="filterTransporForm"
                        id="mark"
                        components={animated}
                        placeholder="Выберите марку"
                        isMulti={false}
                        options={markOfTrasportValues}
                        onChange={(selectedOption) => {
                            handleChange(selectedOption as SelectOption | null);
                        }}
                        value={markOfTrasportValues.filter((option) =>
                            field.value?.includes(option.value)
                        )}
                    />
                )}
            />
        </div>
    );
};

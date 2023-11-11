import {
    Control,
    Controller,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {
    SelectOption,
    TypeSettingTransport,
} from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';
import { valuesOfTransportForm } from '../../../widgets/settingForm/settingTransport/libr/valuesOfTransportForm';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
    watch: UseFormWatch<TypeSettingTransport>;
    setValue: UseFormSetValue<TypeSettingTransport>;
    control: Control<TypeSettingTransport, string>;
}

export const ModelOfTransport = ({ watch, setValue, control }: Props) => {
    const markOfTrasport = watch('mark');

    const animated = makeAnimated();
    const modelOfTransportValues = valuesOfTransportForm.model;
    const disabled = markOfTrasport ? false : true;

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
            setValue('model', selectedValues);
        }
    };

    return (
        <div className="model">
            <h3>Модель</h3>
            <Controller
                name="model"
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        classNamePrefix="filterTransporForm"
                        id="model"
                        components={animated}
                        placeholder="Выберите модель"
                        isDisabled={disabled}
                        isMulti={false}
                        options={modelOfTransportValues}
                        onChange={(selectedOption) => {
                            handleChange(selectedOption as SelectOption | null);
                        }}
                        value={modelOfTransportValues.filter((option) =>
                            field.value?.includes(option.value)
                        )}
                    />
                )}
            />
        </div>
    );
};

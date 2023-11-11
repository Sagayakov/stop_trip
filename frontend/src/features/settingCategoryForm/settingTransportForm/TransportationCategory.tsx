import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { SelectOption, TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';
import { valuesOfTransportForm } from '../../../widgets/settingForm/settingTransport/libr/valuesOfTransportForm';


interface Props {
    setValue: UseFormSetValue<TypeSettingTransport>;
    control: Control<TypeSettingTransport, string[]>;
}

export const TransportationCategory = ({ setValue, control }: Props) => {
    const transportationCategory = valuesOfTransportForm.transportationCategory;
    const animated = makeAnimated();

    const handleChange = (selectedOptions: SelectOption | SelectOption[] | null) => {
        if (selectedOptions) {
            const optionsArray = Array.isArray(selectedOptions)
                ? selectedOptions
                : [selectedOptions];
            const selectedValues = optionsArray
                .map((option) => option?.value)
                .filter(Boolean);
            setValue('transportationCategory', selectedValues);
        }
    };

    return (
        <div className="transportationCategory">
            <h3>Категория транспорта</h3>
            <Controller
                name="transportationCategory"
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        classNamePrefix="filterTransporForm"
                        id="transportationCategory"
                        components={animated}
                        placeholder="Выберите категорию"
                        closeMenuOnSelect={false}
                        isMulti={true}
                        options={transportationCategory}
                        onChange={(selectedOptions) => {
                            handleChange(
                                selectedOptions as
                                    | SelectOption
                                    | SelectOption[]
                                    | null
                            );
                        }}
                        value={transportationCategory.filter((option) =>
                            field.value?.includes(option.value)
                        )}
                    />
                )}
            />
        </div>
    );
};

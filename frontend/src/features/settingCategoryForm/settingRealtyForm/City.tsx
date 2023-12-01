import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {
    SelectOption,
    TypeSettingRealty,
} from '../../../widgets/settingForm/settingRealty/libr/TypeSettingRealty';
import { valuesOfPropertyForm } from '../../../widgets/settingForm/settingRealty/libr/valuesOfPropertyForm';

interface Props {
    setValue: UseFormSetValue<TypeSettingRealty>;
    control: Control<TypeSettingRealty, string[]>;
}

export const City = ({ control, setValue }: Props) => {
    const animated = makeAnimated();
    const cityValues = valuesOfPropertyForm.property_city;

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
            setValue('property_city', selectedValues);
        }
    };

    return (
        <>
            <div className="propertyCity">
                <h3>Город</h3>
                <Controller
                    name="property_city"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            classNamePrefix="filterPropertyForm"
                            id="propertyCity"
                            components={animated}
                            placeholder="Город"
                            closeMenuOnSelect={true}
                            isMulti={false}
                            options={cityValues}
                            onChange={(selectedOptions) => {
                                handleChange(
                                    selectedOptions as
                                        | SelectOption
                                        | SelectOption[]
                                        | null
                                );
                            }}
                            value={cityValues.filter((option) =>
                                field.value?.includes(option.value)
                            )}
                        />
                    )}
                />
            </div>
        </>
    );
};

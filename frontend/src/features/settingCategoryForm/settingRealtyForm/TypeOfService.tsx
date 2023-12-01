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

export const TypeOfService = ({ control, setValue }: Props) => {
    const animated = makeAnimated();
    const valuesTypeOfService = valuesOfPropertyForm.property_type_of_service;

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
            setValue('property_type_of_service', selectedValues);
        }
    };

    return (
        <>
            <div className="typeOfService">
                <h3>Тип услуги</h3>
                <Controller
                    name="property_type_of_service"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            classNamePrefix="filterPropertyForm"
                            id="typeOfService"
                            components={animated}
                            placeholder="Тип услуги"
                            closeMenuOnSelect={false}
                            isMulti={true}
                            options={valuesTypeOfService}
                            onChange={(selectedOptions) => {
                                handleChange(
                                    selectedOptions as
                                        | SelectOption
                                        | SelectOption[]
                                        | null
                                );
                            }}
                            value={valuesTypeOfService.filter((option) =>
                                field.value?.includes(option.value)
                            )}
                        />
                    )}
                />
            </div>
        </>
    );
};

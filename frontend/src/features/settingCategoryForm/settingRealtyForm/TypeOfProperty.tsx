import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { valuesOfPropertyForm } from '../../../widgets/settingForm/settingRealty/valuesOfPropertyForm';
import {
    SelectOption,
    TypeSettingRealty,
} from '../../../widgets/settingForm/settingRealty/TypeSettingRealty';

interface Props {
    setValue: UseFormSetValue<TypeSettingRealty>;
    control: Control<TypeSettingRealty, string[]>;
}

export const TypeOfProperty = ({ control, setValue }: Props) => {
    const animated = makeAnimated();
    const valuesTypeOfProperty = valuesOfPropertyForm.typeOfProperty;

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
            setValue('typeOfProperty', selectedValues);
        }
    };

    return (
        <>
            <div className="type-of-property">
                <h3>Тип недвижимости</h3>
                <Controller
                    name="typeOfProperty"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            classNamePrefix="filterPropertyForm"
                            id="typeOfProperty"
                            components={animated}
                            placeholder="Тип недвижимости"
                            closeMenuOnSelect={true}
                            isMulti={false}
                            options={valuesTypeOfProperty}
                            onChange={(selectedOptions) => {
                                handleChange(
                                    selectedOptions as
                                        | SelectOption
                                        | SelectOption[]
                                        | null
                                );
                            }}
                            value={valuesTypeOfProperty.filter((option) =>
                                field.value?.includes(option.value)
                            )}
                        />
                    )}
                />
            </div>
        </>
    );
};

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

export const RentalCondition = ({ control, setValue }: Props) => {
    const animated = makeAnimated();
    const rentalConditionValues = valuesOfPropertyForm.property_rental_condition;

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
            setValue('property_rental_condition', selectedValues);
        }
    };

    return (
        <>
            <div className="rentalCondition">
                <h3>Условия аренды</h3>
                <Controller
                    name="property_rental_condition"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            classNamePrefix="filterPropertyForm"
                            id="rentalCondition"
                            components={animated}
                            placeholder="Условия аренды"
                            closeMenuOnSelect={false}
                            isMulti={true}
                            options={rentalConditionValues}
                            onChange={(selectedOptions) => {
                                handleChange(
                                    selectedOptions as
                                        | SelectOption
                                        | SelectOption[]
                                        | null
                                );
                            }}
                            value={rentalConditionValues.filter((option) =>
                                field.value?.includes(option.value)
                            )}
                        />
                    )}
                />
            </div>
        </>
    );
};

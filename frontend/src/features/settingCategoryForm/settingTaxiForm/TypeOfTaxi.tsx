import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {
    SelectOption,
    TypeSettingTaxi,
} from '../../../widgets/settingForm/settingTaxi/libr/TypeSettingTaxi';
import { valuesOfTaxiForm } from '../../../widgets/settingForm/settingTaxi/libr/valuesOfTaxiForm';

interface Props {
    setValue: UseFormSetValue<TypeSettingTaxi>;
    control: Control<TypeSettingTaxi, string[]>;
}

export const TypeOfTaxi = ({ control, setValue }: Props) => {
    const animated = makeAnimated();
    const valuesTypeOfTaxi = valuesOfTaxiForm.unitOfMeasurement;

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
            setValue('typeOfTaxi', selectedValues);
        }
    };

    return (
        <>
            <div className="typeOfTaxi">
                <h3>Тип такси</h3>
                <Controller
                    name="typeOfTaxi"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            classNamePrefix="filterTaxiForm"
                            id="typeOfTaxi"
                            components={animated}
                            placeholder="Тип такси"
                            closeMenuOnSelect={false}
                            isMulti={true}
                            options={valuesTypeOfTaxi}
                            onChange={(selectedOptions) => {
                                handleChange(
                                    selectedOptions as
                                        | SelectOption
                                        | SelectOption[]
                                        | null
                                );
                            }}
                            value={valuesTypeOfTaxi.filter((option) =>
                                field.value?.includes(option.value)
                            )}
                        />
                    )}
                />
            </div>
        </>
    );
};

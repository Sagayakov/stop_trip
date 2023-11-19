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

export const UnitOfMeasurement = ({ control, setValue }: Props) => {
    const animated = makeAnimated();
    const valuesUnitOfMeasurement = valuesOfTaxiForm.unitOfMeasurement;

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
            setValue('unitOfMeasurement', selectedValues);
        }
    };

    return (
        <>
            <div className="unitOfMeasurement">
                <h3>Единица измерения</h3>
                <Controller
                    name="unitOfMeasurement"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            classNamePrefix="filterTaxiForm"
                            id="unitOfMeasurement"
                            components={animated}
                            placeholder="Единица измерения"
                            closeMenuOnSelect={false}
                            isMulti={true}
                            options={valuesUnitOfMeasurement}
                            onChange={(selectedOptions) => {
                                handleChange(
                                    selectedOptions as
                                        | SelectOption
                                        | SelectOption[]
                                        | null
                                );
                            }}
                            value={valuesUnitOfMeasurement.filter((option) =>
                                field.value?.includes(option.value)
                            )}
                        />
                    )}
                />
            </div>
        </>
    );
};

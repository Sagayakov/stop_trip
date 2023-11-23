import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { TypesOfJobs } from '../../../widgets/settingForm/settingJob/libr/TypesOfJobs';
import { valuesOfJob } from '../../../widgets/settingForm/settingJob/libr/valuesOfJob';
import { SelectOption } from '../../../widgets/settingForm/settingRealty/libr/TypeSettingRealty';

interface Props {
    setValue: UseFormSetValue<TypesOfJobs>;
    control: Control<TypesOfJobs, string[]>;
}

export const TypeOfPayment = ({ control, setValue }: Props) => {
    const animated = makeAnimated();
    const valuesTypeOfPayment = valuesOfJob.typeOfPayment;

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
            setValue('typeOfPayment', selectedValues);
        }
    };
    return (
        <>
            <div className="typeOfPayment">
                <h3>Тип оплаты</h3>
                <Controller
                    name="typeOfPayment"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            classNamePrefix="filterJobForm"
                            id="typeOfPayment"
                            components={animated}
                            placeholder="Тип оплаты"
                            closeMenuOnSelect={false}
                            isMulti={true}
                            options={valuesTypeOfPayment}
                            onChange={(selectedOptions) => {
                                handleChange(
                                    selectedOptions as
                                        | SelectOption
                                        | SelectOption[]
                                        | null
                                );
                            }}
                            value={valuesTypeOfPayment.filter((option) =>
                                field.value?.includes(option.value)
                            )}
                        />
                    )}
                />
            </div>
        </>
    );
};

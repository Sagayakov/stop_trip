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

export const TypeOfJob = ({ control, setValue }: Props) => {
    const animated = makeAnimated();
    const valuesTypeOfJob = valuesOfJob.typeOfJob;

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
            setValue('job_type', selectedValues);
        }
    };
    return (
        <>
            <div className="typeOfJob">
                <h3>Тип работы</h3>
                <Controller
                    name="job_type"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            classNamePrefix="filterJobForm"
                            id="typeOfJob"
                            components={animated}
                            placeholder="Тип работы"
                            closeMenuOnSelect={true}
                            isMulti={true}
                            options={valuesTypeOfJob}
                            onChange={(selectedOptions) => {
                                handleChange(
                                    selectedOptions as
                                        | SelectOption
                                        | SelectOption[]
                                        | null
                                );
                            }}
                            value={valuesTypeOfJob.filter((option) =>
                                field.value?.includes(option.value)
                            )}
                        />
                    )}
                />
            </div>
        </>
    );
};

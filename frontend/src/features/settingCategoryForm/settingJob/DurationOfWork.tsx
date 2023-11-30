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

export const DurationOfWork = ({ control, setValue }: Props) => {
    const animated = makeAnimated();
    const valuesDurationOfWork = valuesOfJob.durationOfWork;

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
            setValue('job_duration', selectedValues);
        }
    };
    return (
        <>
            <div className="durationOfWork">
                <h3>Продолжительность работы</h3>
                <Controller
                    name="job_duration"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            classNamePrefix="filterJobForm"
                            id="durationOfWork"
                            components={animated}
                            placeholder="Продолжительность работы"
                            closeMenuOnSelect={false}
                            isMulti={true}
                            options={valuesDurationOfWork}
                            onChange={(selectedOptions) => {
                                handleChange(
                                    selectedOptions as
                                        | SelectOption
                                        | SelectOption[]
                                        | null
                                );
                            }}
                            value={valuesDurationOfWork.filter((option) =>
                                field.value?.includes(option.value)
                            )}
                        />
                    )}
                />
            </div>
        </>
    );
};

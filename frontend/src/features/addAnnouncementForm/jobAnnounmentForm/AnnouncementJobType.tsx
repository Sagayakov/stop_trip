import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {
    FormAddAnn,
    SelectOption,
} from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { jobValues } from './libr/jobValues';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
}

export const AnnouncementJobType = ({ setValue, control }: Props) => {
    const animated = makeAnimated();
    const jobTypeValues = jobValues.jobType;

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
            setValue('announcementJob.jobType', selectedValues);
        }
    };

    return (
        <div className="ann-field">
            <h3>Тип работы:</h3>
            <Controller
                name="announcementJob.jobType"
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        classNamePrefix="filterAnnouncementCategory"
                        id="announcementJob.jobType"
                        components={animated}
                        placeholder="Тип работы"
                        closeMenuOnSelect={true}
                        required={true}
                        isMulti={false}
                        options={jobTypeValues}
                        onChange={(selectedOptions) => {
                            handleChange(
                                selectedOptions as
                                    | SelectOption
                                    | SelectOption[]
                                    | null
                            );
                        }}
                        value={jobTypeValues.filter((option) =>
                            field.value?.includes(option.value)
                        )}
                    />
                )}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};

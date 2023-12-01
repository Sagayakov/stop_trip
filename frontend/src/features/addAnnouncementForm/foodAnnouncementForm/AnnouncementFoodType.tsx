import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {
    FormAddAnn,
    SelectOption,
} from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { foodValues } from './libr/foodValues';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
}

export const AnnouncementFoodType = ({ setValue, control }: Props) => {
    const animated = makeAnimated();

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
            setValue('announcementFood.foodType', selectedValues);
        }
    };

    return (
        <div className="ann-field">
            <h3>Тип еды:</h3>
            <Controller
                name="announcementFood.foodType"
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        classNamePrefix="filterAnnouncementCategory"
                        id="announcementFood.foodType"
                        components={animated}
                        placeholder="Тип еды"
                        closeMenuOnSelect={true}
                        required={true}
                        isMulti={false}
                        options={foodValues}
                        onChange={(selectedOptions) => {
                            handleChange(
                                selectedOptions as
                                    | SelectOption
                                    | SelectOption[]
                                    | null
                            );
                        }}
                        value={foodValues.filter((option) =>
                            field.value?.includes(option.value)
                        )}
                    />
                )}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};

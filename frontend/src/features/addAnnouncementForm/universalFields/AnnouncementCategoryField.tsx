import { valuesOfCategory } from '../../../pages/addAnnouncement/libr/valuesOfCategory';
import { FormAddAnn, SelectOption } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
}

export const AnnouncementCategoryField = ({ control, setValue }: Props) => {
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
            setValue('announcementCategory', selectedValues);
        }
    };

    return (
        <>
            <div className="ann-field">
                <h3>Категория<span>*</span>:</h3>
                <Controller
                    name="announcementCategory"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            classNamePrefix="filterAnnouncementCategory"
                            id="announcementCategory"
                            components={animated}
                            placeholder="Выберите категорию"
                            closeMenuOnSelect={true}
                            isMulti={false}
                            options={valuesOfCategory}
                            onChange={(selectedOptions) => {
                                handleChange(
                                    selectedOptions as
                                        | SelectOption
                                        | SelectOption[]
                                        | null
                                );
                            }}
                            value={valuesOfCategory.filter((option) =>
                                field.value?.includes(option.value)
                            )}
                        />
                    )}
                />
                <div className="ann-field-err"></div>
            </div>
        </>
    );
};

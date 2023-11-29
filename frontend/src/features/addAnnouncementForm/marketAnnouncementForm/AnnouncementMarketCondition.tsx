import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {
    FormAddAnn,
    SelectOption,
} from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { conditionValues } from './libr/conditionValues';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
}

export const AnnouncementMarketCondition = ({ setValue, control }: Props) => {
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
            setValue('annoucementMarket', selectedValues);
        }
    };

    return (
        <div className="ann-field">
            <h3>Состояние:</h3>
            <Controller
                name="annoucementMarket"
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        classNamePrefix="filterAnnouncementCategory"
                        id="annoucementMarket"
                        components={animated}
                        placeholder="Состояние"
                        closeMenuOnSelect={true}
                        required={true}
                        isMulti={false}
                        options={conditionValues}
                        onChange={(selectedOptions) => {
                            handleChange(
                                selectedOptions as
                                    | SelectOption
                                    | SelectOption[]
                                    | null
                            );
                        }}
                        value={conditionValues.filter((option) =>
                            field.value?.includes(option.value)
                        )}
                    />
                )}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};

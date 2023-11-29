import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {
    FormAddAnn,
    SelectOption,
} from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { exchangeValues } from './libr/exchangeValues';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
}

export const AnnouncementExchangeFor = ({ setValue, control }: Props) => {
    const animated = makeAnimated();
    const exchangeForValues = exchangeValues.exchangeFor;

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
            setValue('announcementExchange.exchangeFor', selectedValues);
        }
    };

    return (
        <div className="ann-field">
            <h3>Обмен на:</h3>
            <Controller
                name="announcementExchange.exchangeFor"
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        classNamePrefix="filterAnnouncementCategory"
                        id="announcementExchange.exchangeFor"
                        components={animated}
                        placeholder="Обмен на"
                        closeMenuOnSelect={true}
                        required={true}
                        isMulti={false}
                        options={exchangeForValues}
                        onChange={(selectedOptions) => {
                            handleChange(
                                selectedOptions as
                                    | SelectOption
                                    | SelectOption[]
                                    | null
                            );
                        }}
                        value={exchangeForValues.filter((option) =>
                            field.value?.includes(option.value)
                        )}
                    />
                )}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};

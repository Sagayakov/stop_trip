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

export const AnnouncementExchangeName = ({ setValue, control }: Props) => {
    const animated = makeAnimated();
    const exchangeNameValues =  exchangeValues.name

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
            setValue('announcementExchange.name', selectedValues);
        }
    };

    return (
        <div className="ann-field">
            <h3>Предлагаемая валюта:</h3>
            <Controller
                name="announcementExchange.name"
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        classNamePrefix="filterAnnouncementCategory"
                        id="announcementExchange.name"
                        components={animated}
                        placeholder="Предлагаемая валюта"
                        closeMenuOnSelect={true}
                        required={true}
                        isMulti={false}
                        options={exchangeNameValues}
                        onChange={(selectedOptions) => {
                            handleChange(
                                selectedOptions as
                                    | SelectOption
                                    | SelectOption[]
                                    | null
                            );
                        }}
                        value={exchangeNameValues.filter((option) =>
                            field.value?.includes(option.value)
                        )}
                    />
                )}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};

import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {
    FormAddAnn,
    SelectOption,
} from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { taxiValues } from './taxiValues';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
}

export const AnnouncementTaxiUnit = ({ setValue, control }: Props) => {
    const animated = makeAnimated();
    const valuesOfTaxiUnit = taxiValues.valuesOfTaxiUnit

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
            setValue('annoucementTaxi.unit', selectedValues);
        }
    };

    return (
        <div className="ann-field">
            <h3>Единица измерения:</h3>
            <Controller
                name="annoucementTaxi.unit"
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        classNamePrefix="filterAnnouncementCategory"
                        id="annoucementTaxi.unit"
                        components={animated}
                        placeholder="Единица измерения"
                        closeMenuOnSelect={true}
                        required={true}
                        isMulti={false}
                        options={valuesOfTaxiUnit}
                        onChange={(selectedOptions) => {
                            handleChange(
                                selectedOptions as
                                    | SelectOption
                                    | SelectOption[]
                                    | null
                            );
                        }}
                        value={valuesOfTaxiUnit.filter((option) =>
                            field.value?.includes(option.value)
                        )}
                    />
                )}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};

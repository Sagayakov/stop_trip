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
export const AnnouncementTaxiType = ({ control, setValue }: Props) => {
    const animated = makeAnimated();
    const valuesOfTaxiType = taxiValues.valuesofTaxiType;
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
            setValue('annoucementTaxi.taxiType', selectedValues);
        }
    };

    return (
        <div className="ann-field">
            <h3>Вид такси:</h3>
            <Controller
                name="annoucementTaxi.taxiType"
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        classNamePrefix="filterAnnouncementCategory"
                        id="annoucementTaxi.taxiType"
                        components={animated}
                        placeholder="Вид такси"
                        closeMenuOnSelect={true}
                        required={true}
                        isMulti={false}
                        options={valuesOfTaxiType}
                        onChange={(selectedOptions) => {
                            handleChange(
                                selectedOptions as
                                    | SelectOption
                                    | SelectOption[]
                                    | null
                            );
                        }}
                        value={valuesOfTaxiType.filter((option) =>
                            field.value?.includes(option.value)
                        )}
                    />
                )}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};

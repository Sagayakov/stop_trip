import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {
    SelectOption,
    TypeSettingTaxi,
} from '../../../widgets/settingForm/settingTaxi/libr/TypeSettingTaxi';
import { useGetFiltersQuery } from '../../../app/api/fetchAdverts';
import { ChoicesType, SelectType } from '../../../app/api/types/filtersType';
import { useEffect, useState } from 'react';

interface Props {
    setValue: UseFormSetValue<TypeSettingTaxi>;
    control: Control<TypeSettingTaxi, string[]>;
}

export const TypeOfTaxi = ({ control, setValue }: Props) => {
    const animated = makeAnimated();
    const { data } = useGetFiltersQuery('');
    const [typeValues, setTypeValues] = useState<SelectType[]>([]);

    useEffect(() => {
        if (data) {
            const result = (data.params
                .find((el) => el.name === 'taxi_type') as ChoicesType).choices
                .filter((el) => (el as SelectType).value && (el as SelectType).label);
            data && setTypeValues(result as SelectType[]);    
        }
    }, [data]);

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
            setValue('taxi_type', selectedValues);
        }
    };

    return (
        <>
            <div className="typeOfTaxi">
                <h3>Тип такси</h3>
                <Controller
                    name="taxi_type"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            classNamePrefix="filterTaxiForm"
                            id="typeOfTaxi"
                            components={animated}
                            placeholder="Тип такси"
                            closeMenuOnSelect={false}
                            isMulti={true}
                            options={typeValues}
                            onChange={(selectedOptions) => {
                                handleChange(
                                    selectedOptions as
                                        | SelectOption
                                        | SelectOption[]
                                        | null
                                );
                            }}
                            value={typeValues.filter((option) =>
                                field.value?.includes(option.value as string)
                            )}
                        />
                    )}
                />
            </div>
        </>
    );
};

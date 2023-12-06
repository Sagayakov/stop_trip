import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {
    SelectOption,
    TypeSettingRealty,
} from '../../../widgets/settingForm/settingRealty/libr/TypeSettingRealty';
import { useGetFiltersQuery } from '../../../app/api/fetchAdverts';
import { ChoicesType, SelectType } from '../../../app/api/types/filtersType';
import { useEffect, useState } from 'react';

interface Props {
    setValue: UseFormSetValue<TypeSettingRealty>;
    control: Control<TypeSettingRealty, string[]>;
}

export const City = ({ control, setValue }: Props) => {
    const { data } = useGetFiltersQuery('');
    const [cityValues, setCityValues] = useState<SelectType[]>([]);
    const animated = makeAnimated();

    useEffect(() => {
        if (data) {
            const result = (data.params
                .find((el) => el.name === 'property_city') as ChoicesType).choices
                .filter((el) => (el as SelectType).value && (el as SelectType).label);
            data && setCityValues(result as SelectType[]);    
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
            setValue('property_city', selectedValues);
        }
    };

    return (
        <>
            <div className="propertyCity">
                <h3>Город</h3>
                <Controller
                    name="property_city"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            classNamePrefix="filterPropertyForm"
                            id="propertyCity"
                            components={animated}
                            placeholder="Город"
                            closeMenuOnSelect={true}
                            isMulti={false}
                            options={cityValues as SelectType[]}
                            onChange={(selectedOptions) => {
                                handleChange(
                                    selectedOptions as
                                        | SelectOption
                                        | SelectOption[]
                                        | null
                                );
                            }}
                            value={cityValues.filter((option) => (
                                    field.value?.includes(option.value as string)
                                )  
                            )}
                        />
                    )}
                />
            </div>
        </>
    );
};

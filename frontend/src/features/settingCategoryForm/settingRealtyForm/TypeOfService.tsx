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

export const TypeOfService = ({ control, setValue }: Props) => {
    const animated = makeAnimated();
    const { data } = useGetFiltersQuery('');
    const [typesValues, setTypesValues] = useState<SelectType[]>([]);

    useEffect(() => {
        if (data) {
            const result = (data.params
                .find((el) => el.name === 'property_type_of_service') as ChoicesType).choices
                .filter((el) => (el as SelectType).value && (el as SelectType).label);
            data && setTypesValues(result as SelectType[]);    
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
            setValue('property_type_of_service', selectedValues);
        }
    };

    return (
        <>
            <div className="typeOfService">
                <h3>Тип услуги</h3>
                <Controller
                    name="property_type_of_service"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            classNamePrefix="filterPropertyForm"
                            id="typeOfService"
                            components={animated}
                            placeholder="Тип услуги"
                            closeMenuOnSelect={false}
                            isMulti={true}
                            options={typesValues}
                            onChange={(selectedOptions) => {
                                handleChange(
                                    selectedOptions as
                                        | SelectOption
                                        | SelectOption[]
                                        | null
                                );
                            }}
                            value={typesValues.filter((option) =>
                                field.value?.includes(option.value as string)
                            )}
                        />
                    )}
                />
            </div>
        </>
    );
};

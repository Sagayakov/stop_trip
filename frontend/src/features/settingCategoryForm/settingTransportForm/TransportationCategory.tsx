import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {
    SelectOption,
    TypeSettingTransport
} from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';
import { useGetFiltersQuery } from '../../../app/api/fetchAdverts';
import { ChoicesType, SelectType } from '../../../app/api/types/filtersType';
import { useEffect, useState } from 'react';

interface Props {
    setValue: UseFormSetValue<TypeSettingTransport>;
    control: Control<TypeSettingTransport, string[]>;
}

export const TransportationCategory = ({ setValue, control }: Props) => {
    const animated = makeAnimated();
    const { data } = useGetFiltersQuery('');
    const [categoryValues, setCategoryValues] = useState<SelectType[]>([]);

    useEffect(() => {
        if (data) {
            const result = (data.params
                .find((el) => el.name === 'transport_category') as ChoicesType).choices
                .filter((el) => (el as SelectType).value && (el as SelectType).label);
            data && setCategoryValues(result as SelectType[]);    
        }
    }, [data]);

    const handleChange = (selectedOptions: SelectOption | SelectOption[] | null) => {
        if (selectedOptions) {
            const optionsArray = Array.isArray(selectedOptions)
                ? selectedOptions
                : [selectedOptions];
            const selectedValues = optionsArray
                .map((option) => option?.value)
                .filter(Boolean);
            setValue('transport_category', selectedValues);
        }
    };

    return (
        <div className="transportationCategory">
            <h3>Категория транспорта</h3>
            <Controller
                name="transport_category"
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        classNamePrefix="filterTransporForm"
                        id="transportationCategory"
                        components={animated}
                        placeholder="Выберите категорию"
                        closeMenuOnSelect={false}
                        isMulti={true}
                        options={categoryValues}
                        onChange={(selectedOptions) => {
                            handleChange(
                                selectedOptions as
                                    | SelectOption
                                    | SelectOption[]
                                    | null
                            );
                        }}
                        value={categoryValues.filter((option) =>
                            field.value?.includes(option.value as string)
                        )}
                    />
                )}
            />
        </div>
    );
};

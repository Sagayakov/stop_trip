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
import { useTranslation } from 'react-i18next';

interface Props {
    setValue: UseFormSetValue<TypeSettingRealty>;
    control: Control<TypeSettingRealty, string[]>;
}

export const RentalCondition = ({ control, setValue }: Props) => {
    const animated = makeAnimated();
    const { data } = useGetFiltersQuery('');
    const [rentalValues, setRentalValues] = useState<SelectType[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        if (data) {
            const result = (
                data.params.find(
                    (el) => el.name === 'property_rental_condition'
                ) as ChoicesType
            ).choices.filter(
                (el) => (el as SelectType).value && (el as SelectType).label
            );
            data && setRentalValues(result as SelectType[]);
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
            setValue('property_rental_condition', selectedValues);
        }
    };

    return (
        <>
            <div className="rentalCondition">
                <h3>{t('filters.rent-conditions')}</h3>
                <Controller
                    name="property_rental_condition"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            classNamePrefix="filterPropertyForm"
                            id="rentalCondition"
                            components={animated}
                            placeholder={t('filters.rent-conditions')}
                            closeMenuOnSelect={false}
                            isMulti={true}
                            options={rentalValues}
                            onChange={(selectedOptions) => {
                                handleChange(
                                    selectedOptions as
                                        | SelectOption
                                        | SelectOption[]
                                        | null
                                );
                            }}
                            value={rentalValues.filter(
                                (option) =>
                                    field.value?.includes(
                                        option.value as string
                                    )
                            )}
                        />
                    )}
                />
            </div>
        </>
    );
};

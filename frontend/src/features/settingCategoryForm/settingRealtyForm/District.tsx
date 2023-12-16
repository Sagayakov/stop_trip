import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {
    SelectOption,
    TypeSettingRealty,
} from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { ChoicesType, SelectType } from 'app/api/types/filtersType.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
    setValue: UseFormSetValue<TypeSettingRealty>;
    control: Control<TypeSettingRealty, string[]>;
}

export const District = ({ control, setValue }: Props) => {
    const animated = makeAnimated();
    const { data } = useGetFiltersQuery('');
    const [districtValues, setDistrictValues] = useState<SelectType[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        if (data) {
            const result = (
                data.params.find(
                    (el) => el.name === 'property_district'
                ) as ChoicesType
            ).choices.filter(
                (el) => (el as SelectType).value && (el as SelectType).label
            );
            data && setDistrictValues(result as SelectType[]);
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
            setValue('property_district', selectedValues);
        }
    };

    return (
        <>
            <div className="propertyDistrict">
                <h3>{t('filters.property_district')}</h3>
                <Controller
                    name="property_district"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            classNamePrefix="filterPropertyForm"
                            id="propertyDistrict"
                            components={animated}
                            placeholder={t('filters.property_district')}
                            closeMenuOnSelect={true}
                            isMulti={false}
                            options={districtValues}
                            onChange={(selectedOptions) => {
                                handleChange(
                                    selectedOptions as
                                        | SelectOption
                                        | SelectOption[]
                                        | null
                                );
                            }}
                            value={districtValues.filter(
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

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
import { useTranslation } from 'react-i18next';

interface Props {
    setValue: UseFormSetValue<TypeSettingTaxi>;
    control: Control<TypeSettingTaxi, string[]>;
}

export const UnitOfMeasurement = ({ control, setValue }: Props) => {
    const animated = makeAnimated();
    const { data } = useGetFiltersQuery('');
    const [unitValues, setUnitValues] = useState<SelectType[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        if (data) {
            const result = (
                data.params.find((el) => el.name === 'taxi_unit') as ChoicesType
            ).choices.filter(
                (el) => (el as SelectType).value && (el as SelectType).label
            );
            data && setUnitValues(result as SelectType[]);
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
            setValue('taxi_unit', selectedValues);
        }
    };

    return (
        <>
            <div className="unitOfMeasurement">
                <h3>{t('filters.unit')}</h3>
                <Controller
                    name="taxi_unit"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            classNamePrefix="filterTaxiForm"
                            id="unitOfMeasurement"
                            components={animated}
                            placeholder={t('filters.unit')}
                            closeMenuOnSelect={false}
                            isMulti={true}
                            options={unitValues}
                            onChange={(selectedOptions) => {
                                handleChange(
                                    selectedOptions as
                                        | SelectOption
                                        | SelectOption[]
                                        | null
                                );
                            }}
                            value={unitValues.filter(
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

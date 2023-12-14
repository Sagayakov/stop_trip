import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {
    SelectOption,
    TypeSettingTransport,
} from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';
import { useGetFiltersQuery } from '../../../app/api/fetchAdverts';
import { ChoicesType, SelectType } from '../../../app/api/types/filtersType';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
    control: Control<TypeSettingTransport, string[]>;
    setValue: UseFormSetValue<TypeSettingTransport>;
}

export const BodyTypeOfTransport = ({ setValue, control }: Props) => {
    const { data } = useGetFiltersQuery('');
    const [bodyTypesValues, setBodyTypesValues] = useState<SelectType[]>([]);
    const animated = makeAnimated();
    const { t } = useTranslation();

    useEffect(() => {
        if (data) {
            const result = (
                data.params.find(
                    (el) => el.name === 'transport_body_type'
                ) as ChoicesType
            ).choices.filter(
                (el) => (el as SelectType).value && (el as SelectType).label
            );
            data && setBodyTypesValues(result as SelectType[]);
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
            setValue('transport_body_type', selectedValues);
        }
    };

    return (
        <div className="bodyType">
            <h3>{t('filters.body-type')}</h3>
            <Controller
                name="transport_body_type"
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        classNamePrefix="filterTransporForm"
                        id="bodyType"
                        components={animated}
                        placeholder={t('filters.body-type')}
                        closeMenuOnSelect={false}
                        isMulti={true}
                        options={bodyTypesValues}
                        onChange={(selectedOptions) => {
                            handleChange(
                                selectedOptions as
                                    | SelectOption
                                    | SelectOption[]
                                    | null
                            );
                        }}
                        value={bodyTypesValues.filter(
                            (option) =>
                                field.value?.includes(option.value as string)
                        )}
                    />
                )}
            />
        </div>
    );
};

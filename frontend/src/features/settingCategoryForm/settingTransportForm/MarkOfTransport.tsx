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
    setValue: UseFormSetValue<TypeSettingTransport>;
    control: Control<TypeSettingTransport, string>;
}

export const MarkOfTransport = ({ setValue, control }: Props) => {
    const animated = makeAnimated();
    const { data } = useGetFiltersQuery('');
    const [markOfTrasportValues, setMarkOfTrasportValues] = useState<
        SelectType[]
    >([]);
    const { t } = useTranslation();

    useEffect(() => {
        if (data) {
            const result = (
                data.params.find(
                    (el) => el.name === 'transport_brand'
                ) as ChoicesType
            ).choices.filter(
                (el) => (el as SelectType).value && (el as SelectType).label
            );
            data && setMarkOfTrasportValues(result as SelectType[]);
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
            setValue('transport_brand', selectedValues);
        }
    };

    return (
        <div className="mark">
            <h3>{t('filters.brand')}</h3>
            <Controller
                name="transport_brand"
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        classNamePrefix="filterTransporForm"
                        id="mark"
                        components={animated}
                        placeholder={t('filters.choose-brand')}
                        isMulti={false}
                        options={markOfTrasportValues}
                        onChange={(selectedOption) => {
                            handleChange(selectedOption as SelectOption | null);
                        }}
                        value={markOfTrasportValues.filter(
                            (option) =>
                                field.value?.includes(option.value as string)
                        )}
                    />
                )}
            />
        </div>
    );
};

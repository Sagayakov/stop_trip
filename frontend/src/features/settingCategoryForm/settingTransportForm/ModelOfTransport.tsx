import {
    Control,
    Controller,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';
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
    register: UseFormRegister<TypeSettingTransport>;
    watch: UseFormWatch<TypeSettingTransport>;
    setValue: UseFormSetValue<TypeSettingTransport>;
    control: Control<TypeSettingTransport, string>;
}

export const ModelOfTransport = ({ watch, setValue, control }: Props) => {
    const markOfTrasport = watch('transport_brand');
    const animated = makeAnimated();
    const disabled = markOfTrasport && markOfTrasport.length ? false : true;
    const { data } = useGetFiltersQuery('');
    const [modelOfTransportValues, setModelOfTransportValues] = useState<
        SelectType[]
    >([]);
    const { t } = useTranslation();

    useEffect(() => {
        if (data) {
            const result = (
                data.params.find(
                    (el) => el.name === 'transport_model'
                ) as ChoicesType
            ).choices.filter(
                (el) => (el as SelectType).value && (el as SelectType).label
            );
            data && setModelOfTransportValues(result as SelectType[]);
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
            setValue('transport_model', selectedValues);
        }
    };

    return (
        <div className="model">
            <h3>{t('filters.transport_model')}</h3>
            <Controller
                name="transport_model"
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        classNamePrefix="filterTransporForm"
                        id="model"
                        components={animated}
                        placeholder={t('filters.choose-model')}
                        isDisabled={disabled}
                        isMulti={false}
                        options={modelOfTransportValues}
                        onChange={(selectedOption) => {
                            handleChange(selectedOption as SelectOption | null);
                        }}
                        value={modelOfTransportValues.filter(
                            (option) =>
                                field.value?.includes(option.value as string)
                        )}
                    />
                )}
            />
        </div>
    );
};

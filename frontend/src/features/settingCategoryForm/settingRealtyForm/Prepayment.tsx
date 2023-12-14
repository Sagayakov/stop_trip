import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {
    SelectOption,
    TypeSettingRealty,
} from '../../../widgets/settingForm/settingRealty/libr/TypeSettingRealty';
import { valuesOfPropertyForm } from '../../../widgets/settingForm/settingRealty/libr/valuesOfPropertyForm';
import { useTranslation } from 'react-i18next';

interface Props {
    setValue: UseFormSetValue<TypeSettingRealty>;
    control: Control<TypeSettingRealty, string[]>;
}

export const Prepayment = ({ control, setValue }: Props) => {
    const animated = makeAnimated();
    const prepaymentValues = valuesOfPropertyForm.property_prepayment;
    const { t } = useTranslation();

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
            setValue('property_prepayment', selectedValues);
        }
    };

    return (
        <>
            <div className="prepayment">
                <h3>{t('filters.property_prepayment')}</h3>
                <Controller
                    name="property_prepayment"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            classNamePrefix="filterPropertyForm"
                            id="prepayment"
                            components={animated}
                            placeholder={t('filters.property_prepayment')}
                            closeMenuOnSelect={false}
                            isMulti={true}
                            options={prepaymentValues}
                            onChange={(selectedOptions) => {
                                handleChange(
                                    selectedOptions as
                                        | SelectOption
                                        | SelectOption[]
                                        | null
                                );
                            }}
                            value={prepaymentValues.filter(
                                (option) => field.value?.includes(option.value)
                            )}
                        />
                    )}
                />
            </div>
        </>
    );
};

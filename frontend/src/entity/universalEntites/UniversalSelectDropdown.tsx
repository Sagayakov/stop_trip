import { Control, Controller, FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useTranslation } from 'react-i18next';

interface Props<T extends FieldValues> {
    setValue: UseFormSetValue<T>;
    control: Control<T, string[]>;
    name: Path<T>;
    prefix: string;
    placeholder: string;
    closeMenuOnSelect: boolean;
    isMulti: boolean;
    options: SelectOption[] | undefined;
    requiredFiled?: boolean;
    isSearchable?: boolean;
    isClearable?: boolean;
    defaultValue?: SelectOption;
    isDisabled?: boolean;
}
interface SelectOption{
    value: string | number | null | boolean
    label: string | number | null | boolean
}

export const UniversalSelectDropdown = <T extends FieldValues>({
    control,
    setValue,
    name,
    prefix,
    placeholder,
    closeMenuOnSelect,
    isMulti,
    options,
    isSearchable,
    isClearable,
    defaultValue,
    isDisabled,
    requiredFiled,
}: Props<T>) => {
    const animated = makeAnimated();
    const { t } = useTranslation();

    const handleChange = (
        selectedOptions: SelectOption | SelectOption[] | null
    ) => {
        defaultValue = undefined
        if (selectedOptions) {
            const optionsArray = Array.isArray(selectedOptions)
                ? selectedOptions
                : [selectedOptions];
            const selectedValues = optionsArray
                .map((option) => option?.value)
                .filter(Boolean) as PathValue<T, Path<T>>;
            if (isMulti) {
                setValue(name, selectedValues);
            } else {
                setValue(name, selectedValues[0]);
            }
        }
    };

    return (
        <Controller
            name={name}
            control={control}
            rules={{
                required: {
                    value: requiredFiled || false,
                    message: t('add-page.required')
                }
            }}
            render={({ field }) => (
                <Select
                    {...field}
                    classNamePrefix={prefix}
                    id={name}
                    components={animated}
                    placeholder={placeholder}
                    closeMenuOnSelect={closeMenuOnSelect}
                    isMulti={isMulti}
                    isClearable={isClearable}
                    options={options}
                    defaultValue={defaultValue}
                    isDisabled={isDisabled}
                    isSearchable={isSearchable}
                    onChange={(selectedOptions) => {
                        handleChange(
                            selectedOptions as
                                | SelectOption
                                | SelectOption[]
                                | null
                        );
                    }}
                    value={defaultValue || (options?.filter(
                        (option) => field.value?.includes(option.value)
                    ))}
                />
            )}
        />
    );
};
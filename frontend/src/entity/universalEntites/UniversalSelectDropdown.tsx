import {
    Control,
    Controller,
    FieldValues,
    Path,
    PathValue,
    UseFormSetValue,
} from 'react-hook-form';
import Select, { ActionMeta } from 'react-select';
import makeAnimated from 'react-select/animated';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

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
    defaultValue?: SelectOption | SelectOption[];
    isDisabled?: boolean;
}
interface SelectOption {
    value: string;
    label: string;
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
    const [searchParams] = useSearchParams();
    const searchValues = searchParams.get(name)?.split(',');
    const [searchOptions, setSearchOptions] = useState<SelectOption[]>([]);
    const [availableOptions, setAvailableOptions] = useState<SelectOption[]>(
        []
    );

    useEffect(() => {
        if (options) {
            setSearchOptions(
                options.filter((el) => searchValues?.includes(el.value))
            );
            name !== 'region' &&
                setAvailableOptions(
                    options.filter((el) => !searchValues?.includes(el.value))
                );
        }
    }, [options, name]);

    const handleChange = (
        selectedOptions: SelectOption | SelectOption[] | null,
        context: ActionMeta<SelectOption>
    ) => {
        defaultValue = undefined;

        if (selectedOptions) {
            let optionsArray = [];

            if (Array.isArray(selectedOptions)) {
                let newOptions = Array.from(
                    new Set([...searchOptions, ...selectedOptions])
                );

                if (context.action === 'clear') {
                    newOptions = [];
                }

                if (context.action === 'remove-value') {
                    newOptions = newOptions.filter(
                        (item) => item.value !== context.removedValue.value
                    );

                    setAvailableOptions(
                        Array.from(
                            new Set([...availableOptions, context.removedValue])
                        )
                    );
                }

                setSearchOptions(newOptions);
                optionsArray = newOptions;
            } else {
                setSearchOptions([selectedOptions]);
                optionsArray = [selectedOptions];
            }

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
        <>
            {options && (
                <Controller
                    name={name}
                    control={control}
                    rules={{
                        required: {
                            value: requiredFiled || false,
                            message: t('add-page.required'),
                        },
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
                            options={
                                availableOptions.length
                                    ? availableOptions
                                    : options
                            }
                            defaultValue={defaultValue || searchOptions}
                            isDisabled={isDisabled}
                            isSearchable={isSearchable}
                            onChange={(selectedOptions, context) => {
                                handleChange(
                                    selectedOptions as
                                        | SelectOption
                                        | SelectOption[]
                                        | null,
                                    context
                                );
                            }}
                            value={
                                searchOptions.length
                                    ? searchOptions
                                    : defaultValue ??
                                      options.filter((option) =>
                                          name === 'region'
                                              ? field.value === option.value
                                              : field.value?.includes(
                                                    option.value
                                                )
                                      )
                            }
                        />
                    )}
                />
            )}
        </>
    );
};

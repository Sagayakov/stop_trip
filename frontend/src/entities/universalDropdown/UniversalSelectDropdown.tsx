import { Control, Controller, FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

interface Props<T extends FieldValues>{
    setValue: UseFormSetValue<T>;
    control: Control<T, string[]>;
    name: Path<T>
    prefix: string;
    placeholder: string;
    closeMenuOnSelect: boolean
    isMulti: boolean
    options: SelectOption[]
}
interface SelectOption{
    value: string
    label: string
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
}: Props<T>) => {
    const animated = makeAnimated();

    const handleChange = (
        selectedOptions: SelectOption | SelectOption[] | null
    ) => {
        if (selectedOptions) {
            const optionsArray = Array.isArray(selectedOptions)
                ? selectedOptions
                : [selectedOptions];
            const selectedValues = optionsArray
                .map((option) => option?.value)
                .filter(Boolean) as PathValue<T, Path<T>>;
            if(isMulti){
                setValue(name, selectedValues);
            }else {
                setValue(name, selectedValues[0])
            }
        }
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Select
                    {...field}
                    classNamePrefix={prefix}
                    id={name}
                    components={animated}
                    placeholder={placeholder}
                    closeMenuOnSelect={closeMenuOnSelect}
                    isMulti={isMulti}
                    options={options}
                    onChange={(selectedOptions) => {
                        handleChange(
                            selectedOptions as
                                | SelectOption
                                | SelectOption[]
                                | null
                        );
                    }}
                    value={options.filter((option) =>
                        field.value?.includes(option.value)
                    )}
                />
            )}
        />
    );
};
// import { Control, Controller, FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form';
// import Select from 'react-select';
// import makeAnimated from 'react-select/animated';

// interface Props<T extends FieldValues>{
//     setValue: UseFormSetValue<T>;
//     control: Control<T, string[]>;
//     name: Path<T>
//     prefix: string;
//     placeholder: string;
//     closeMenuOnSelect: boolean
//     isMulti: boolean
//     options: SelectOption[]
// }
// interface SelectOption{
//     value: string
//     label: string
// }

// export const UniversalSelectDropdown = <T extends FieldValues>({
//     control,
//     setValue,
//     name,
//     prefix,
//     placeholder,
//     closeMenuOnSelect,
//     isMulti,
//     options,
// }: Props<T>) => {
//     const animated = makeAnimated();

//     const handleChange = (
//         selectedOptions: SelectOption | SelectOption[] | null
//     ) => {
//         if (selectedOptions) {
//             const optionsArray = Array.isArray(selectedOptions)
//                 ? selectedOptions
//                 : [selectedOptions];
//             const selectedValues = optionsArray
//                 .map((option) => option?.value)
//                 .filter(Boolean) as PathValue<T, Path<T>>;
//             setValue(name, selectedValues);
//         }
//     };

//     return (
//         <Controller
//             name={name}
//             control={control}
//             render={({ field }) => (
//                 <Select
//                     {...field}
//                     classNamePrefix={prefix}
//                     id={name}
//                     components={animated}
//                     placeholder={placeholder}
//                     closeMenuOnSelect={closeMenuOnSelect}
//                     isMulti={isMulti}
//                     options={options}
//                     onChange={(selectedOptions) => {
//                         handleChange(
//                             selectedOptions as
//                                 | SelectOption
//                                 | SelectOption[]
//                                 | null
//                         );
//                     }}
//                     value={options.filter((option) =>
//                         field.value?.includes(option.value)
//                     )}
//                 />
//             )}
//         />
//     );
// };
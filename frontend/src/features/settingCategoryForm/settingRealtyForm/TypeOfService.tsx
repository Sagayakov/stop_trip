import { UniversalCheckboxGroup } from '../../../entities/universalDropdown';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';
// import makeAnimated from 'react-select/animated';
import { useGetFiltersQuery } from '../../../app/api/fetchAdverts';
import { ChoicesType, /*SelectType */} from '../../../app/api/types/filtersType';
import { TypeSettingRealty } from '../../../widgets/settingForm/settingRealty/libr/TypeSettingRealty';

interface Props {
    setValue: UseFormSetValue<TypeSettingRealty>;
    control: Control<TypeSettingRealty, string[]>;
    register: UseFormRegister<TypeSettingRealty>;
}
interface Options {
    value: string | number;
    label: string | number;
}

export const TypeOfService = ({ register }: Props) => {
    const { data } = useGetFiltersQuery('');
    const [typesValues, setTypesValues] = useState<Options[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        if (data) {
            const result = (
                data.params.find(
                    (el) => el.name === 'property_type_of_service'
                ) as ChoicesType
            ).choices.filter(
                (el) => (el as Options).value && (el as Options).label
            );
            data && setTypesValues(result as Options[]);
        }
    }, [data]);

    return (
        <>
            <div className="typeOfService">
                <h3>{t('filters.property_type_of_service')}</h3>
                <UniversalCheckboxGroup
                    checkboxValues={typesValues}
                    name="property_type_of_service"
                    register={register}
                />
            </div>
        </>
    );
};
// export const TypeOfService = ({ control, setValue }: Props) => {
//     const animated = makeAnimated();
//     const { data } = useGetFiltersQuery('');
//     const [typesValues, setTypesValues] = useState<SelectType[]>([]);

//     useEffect(() => {
//         if (data) {
//             const result = (data.params
//                 .find((el) => el.name === 'property_type_of_service') as ChoicesType).choices
//                 .filter((el) => (el as SelectType).value && (el as SelectType).label);
//             data && setTypesValues(result as SelectType[]);
//         }
//     }, [data]);

//     const handleChange = (
//         selectedOptions: SelectOption | SelectOption[] | null
//     ) => {
//         if (selectedOptions) {
//             const optionsArray = Array.isArray(selectedOptions)
//                 ? selectedOptions
//                 : [selectedOptions];
//             const selectedValues = optionsArray
//                 .map((option) => option?.value)
//                 .filter(Boolean);
//             setValue('property_type_of_service', selectedValues);
//         }
//     };

//     return (
//         <>
//             <div className="typeOfService">
//                 <h3>Тип услуги</h3>
//                 <Controller
//                     name="property_type_of_service"
//                     control={control}
//                     render={({ field }) => (
//                         <Select
//                             {...field}
//                             classNamePrefix="filterPropertyForm"
//                             id="typeOfService"
//                             components={animated}
//                             placeholder="Тип услуги"
//                             closeMenuOnSelect={false}
//                             isMulti={true}
//                             options={typesValues}
//                             onChange={(selectedOptions) => {
//                                 handleChange(
//                                     selectedOptions as
//                                         | SelectOption
//                                         | SelectOption[]
//                                         | null
//                                 );
//                             }}
//                             value={typesValues.filter((option) =>
//                                 field.value?.includes(option.value as string)
//                             )}
//                         />
//                     )}
//                 />
//             </div>
//         </>
//     );
// };

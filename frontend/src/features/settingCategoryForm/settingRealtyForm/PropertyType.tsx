import { Control, UseFormSetValue } from 'react-hook-form';
import { TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { useEffect, useState } from 'react';
import { ChoicesType, SelectType } from 'app/api/types/filtersType.ts';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entities/universalEntites/UniversalSelectDropdown.tsx';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss'

interface Props {
    setValue: UseFormSetValue<TypeSettingRealty>;
    control: Control<TypeSettingRealty, string[]>;
}

export const PropertyType = ({ control, setValue }: Props) => {
    const { data } = useGetFiltersQuery('');
    const [propertyType, setPropertyType] = useState<SelectType[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        if (data) {
            const result = (
                data.params.find(
                    (el) => el.name === 'property_type'
                ) as ChoicesType
            ).choices.filter(
                (el) => (el as SelectType).value && (el as SelectType).label
            );
            data && setPropertyType(result as SelectType[]);
        }
    }, [data]);

    return (
        <>
            <div className={styles.propertyType}>
                <h3>{t('filters.property_type')}</h3>
                <UniversalSelectDropdown<TypeSettingRealty>
                    setValue={setValue}
                    control={control}
                    name="property_type"
                    prefix="filterForm"
                    placeholder={t('filters.property_type')}
                    closeMenuOnSelect={false}
                    isMulti={true}
                    options={propertyType}
                />
            </div>
        </>
    )
}
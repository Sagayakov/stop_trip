import { Control, UseFormSetValue } from 'react-hook-form';
import {    TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { ChoicesType, SelectType } from 'app/api/types/filtersType.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entities/universalEntites/UniversalSelectDropdown.tsx';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss'

interface Props {
    setValue: UseFormSetValue<TypeSettingRealty>;
    control: Control<TypeSettingRealty, string[]>;
}

export const HouseType = ({ control, setValue }: Props) => {
    const { data } = useGetFiltersQuery('');
    const [houseTypeValues, setHouseTypeValues] = useState<SelectType[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        if (data) {
            const result = (
                data.params.find(
                    (el) => el.name === 'property_house_type'
                ) as ChoicesType
            ).choices.filter(
                (el) => (el as SelectType).value && (el as SelectType).label
            );
            data && setHouseTypeValues(result as SelectType[]);
        }
    }, [data]);

    return (
        <>
            <div className={styles.houseType}>
                <h3>{t('filters.property_house_type')}</h3>
                <UniversalSelectDropdown<TypeSettingRealty>
                    setValue={setValue}
                    control={control}
                    name="property_house_type"
                    prefix="filterForm"
                    placeholder={t('filters.property_house_type')}
                    closeMenuOnSelect={false}
                    isMulti={true}
                    options={houseTypeValues}
                />
            </div>
        </>
    );
};

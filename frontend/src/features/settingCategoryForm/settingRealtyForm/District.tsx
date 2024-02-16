import { Control, UseFormSetValue } from 'react-hook-form';
import { TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss';

interface Props {
    setValue: UseFormSetValue<TypeSettingRealty>;
    control: Control<TypeSettingRealty, string[]>;
}

type SelectType = {
    value: string;
    label: string;
};

export const District = ({ control, setValue }: Props) => {
    const { data } = useGetFiltersQuery('');
    const [districtValues, setDistrictValues] = useState<SelectType[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        if (data) {
            const result = (data['region'] as SelectType[]).filter(
                (el) => (el as SelectType).value && (el as SelectType).label
            );
            data && setDistrictValues(result as SelectType[]);
        }
    }, [data]);

    return (
        <>
            <div className={styles.propertyDistrict}>
                <h3>{t('filters.property_district')}</h3>
                <UniversalSelectDropdown<TypeSettingRealty>
                    setValue={setValue}
                    control={control}
                    name="region"
                    prefix="filterForm"
                    placeholder={t('filters.property_district')}
                    closeMenuOnSelect={true}
                    isMulti={false}
                    options={districtValues}
                    defaultValue={{ value: 'goa', label: 'Гоа' }}
                />
            </div>
        </>
    );
};

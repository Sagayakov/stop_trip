import { Control, UseFormSetValue } from 'react-hook-form';
import { TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss';
import { useAppSelector } from 'app/store/hooks';

interface Props {
    setValue: UseFormSetValue<TypeSettingRealty>;
    control: Control<TypeSettingRealty, string[]>;
}

type SelectType = {
    value: string;
    label: string;
};

export const PropertyType = ({ control, setValue }: Props) => {
    const { data } = useGetFiltersQuery('');
    const [propertyType, setPropertyType] = useState<SelectType[]>([]);
    const { t } = useTranslation();
    const lang = useAppSelector((state) => state.setLang.lang);

    useEffect(() => {
        if (data) {
            const result = (data['property_type'] as SelectType[]).filter(
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
                    options={
                        lang === 'ru'
                            ? propertyType
                            : propertyType.map((el) => ({
                                  value: el.value,
                                  label: `${el.value[0].toUpperCase()}${el.value.slice(
                                      1
                                  )}`,
                              }))
                    }
                />
            </div>
        </>
    );
};

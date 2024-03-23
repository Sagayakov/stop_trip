import { Control, UseFormSetValue } from 'react-hook-form';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import { TypeSettingTransport } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport';
import styles from 'widgets/settingForm/settingTransport/libr/settingTransportForm.module.scss';

interface Props {
    setValue: UseFormSetValue<TypeSettingTransport>;
    control: Control<TypeSettingTransport, string[]>;
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
                <UniversalSelectDropdown<TypeSettingTransport>
                    setValue={setValue}
                    control={control}
                    name="region"
                    prefix="filterForm"
                    placeholder={t('filters.property_district')}
                    closeMenuOnSelect={true}
                    isMulti={false}
                    options={districtValues}
                    defaultValue={{
                        value: 'north-goa',
                        label: 'Северный Гоа',
                    }}
                />
            </div>
        </>
    );
};

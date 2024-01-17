import { Control, UseFormSetValue } from 'react-hook-form';
import { TypeSettingTransport } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { ChoicesType, SelectType } from 'app/api/types/filtersType.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import styles from 'widgets/settingForm/settingTransport/libr/settingTransportForm.module.scss';

interface Props {
    setValue: UseFormSetValue<TypeSettingTransport>;
    control: Control<TypeSettingTransport, string[]>;
}

export const TransportationCategory = ({ setValue, control }: Props) => {
    const { data } = useGetFiltersQuery('');
    const [categoryValues, setCategoryValues] = useState<SelectType[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        if (data) {
            const result = (
                data.params.find(
                    (el) => el.name === 'transport_category'
                ) as ChoicesType
            ).choices.filter(
                (el) => (el as SelectType).value && (el as SelectType).label
            );
            data && setCategoryValues(result as SelectType[]);
        }
    }, [data]);

    return (
        <div className={styles.transportationCategory}>
            <h3>{t('filters.transport_category')}</h3>
            <UniversalSelectDropdown
                setValue={setValue}
                control={control}
                name="transport_category"
                prefix="filterForm"
                placeholder={t('filters.transport_category')}
                closeMenuOnSelect={false}
                isMulti={true}
                options={categoryValues}
            />
        </div>
    );
};

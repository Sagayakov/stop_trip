import { Control, UseFormSetValue } from 'react-hook-form';
import { TypeSettingTransport } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { SelectType } from 'app/api/types/filtersType.ts';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import { useEffect, useState } from 'react';
import styles from 'widgets/settingForm/settingTransport/libr/settingTransportForm.module.scss';

interface Props {
    control: Control<TypeSettingTransport, string[]>;
    setValue: UseFormSetValue<TypeSettingTransport>;
}

export const BodyTypeOfTransport = ({ setValue, control }: Props) => {
    const { data } = useGetFiltersQuery('');
    const [bodyTypesValues, setBodyTypesValues] = useState<SelectType[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        if (data) {
            const result = (data['transport_body_type'] as SelectType[]).filter(
                (el) => (el as SelectType).value && (el as SelectType).label
            );
            data && setBodyTypesValues(result as SelectType[]);
        }
    }, [data]);

    return (
        <div className={styles.bodyType}>
            <h3>{t('filters.transport_body_type')}</h3>
            <UniversalSelectDropdown
                setValue={setValue}
                control={control}
                name="transport_body_type"
                prefix="filterForm"
                placeholder={t('filters.transport_body_type')}
                closeMenuOnSelect={false}
                isMulti={true}
                options={bodyTypesValues}
            />
        </div>
    );
};

import { Control, UseFormSetValue } from 'react-hook-form';
import { TypeSettingTransport } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { SelectType, ChoicesType } from 'app/api/types/filtersType.ts';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entities/universalEntites/UniversalSelectDropdown.tsx';
import { useEffect, useState } from 'react';
import styles from 'widgets/settingForm/settingTransport/libr/settingTransportForm.module.scss'

interface Props {
    setValue: UseFormSetValue<TypeSettingTransport>;
    control: Control<TypeSettingTransport, string[]>;
}


export const MarkOfTransport = ({ setValue, control }: Props) => {
    const { data } = useGetFiltersQuery('');
    const [markOfTrasportValues, setMarkOfTrasportValues] = useState<
        SelectType[]
    >([]);
    const { t } = useTranslation();

    useEffect(() => {
        if (data) {
            const result = (
                data.params.find(
                    (el) => el.name === 'transport_brand'
                ) as ChoicesType
            ).choices.filter(
                (el) => (el as SelectType).value && (el as SelectType).label
            );
            data && setMarkOfTrasportValues(result as SelectType[]);
        }
    }, [data]);

    return (
        <div className={styles.mark}>
            <h3>{t('filters.transport_brand')}</h3>
            <UniversalSelectDropdown
                setValue={setValue}
                control={control}
                name="transport_brand"
                prefix="filterForm"
                placeholder={t('filters.choose-brand')}
                closeMenuOnSelect={true}
                isMulti={false}
                options={markOfTrasportValues}
            />
        </div>
    );
};

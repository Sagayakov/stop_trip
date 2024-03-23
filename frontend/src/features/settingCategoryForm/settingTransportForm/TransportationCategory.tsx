import { Control, UseFormSetValue } from 'react-hook-form';
import { TypeSettingTransport } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import styles from 'widgets/settingForm/settingTransport/libr/settingTransportForm.module.scss';
import { useAppSelector } from 'app/store/hooks';

interface Props {
    setValue: UseFormSetValue<TypeSettingTransport>;
    control: Control<TypeSettingTransport, string[]>;
}

type SelectType = {
    value: string;
    label: string;
};

export const TransportationCategory = ({ setValue, control }: Props) => {
    const { data } = useGetFiltersQuery('');
    const [categoryValues, setCategoryValues] = useState<SelectType[]>([]);
    const { t } = useTranslation();
    const lang = useAppSelector((state) => state.setLang.lang);

    useEffect(() => {
        if (data) {
            const result = (data['transport_category'] as SelectType[]).filter(
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
                options={
                    lang === 'ru'
                        ? categoryValues
                        : categoryValues.map((el) => ({
                              value: el.value,
                              label: `${el.value[0].toUpperCase()}${el.value.slice(
                                  1
                              )}`,
                          }))
                }
            />
        </div>
    );
};

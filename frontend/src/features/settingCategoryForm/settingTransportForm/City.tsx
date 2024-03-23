import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import {
    useGetAvailableFiltersQuery,
    useGetFiltersQuery,
} from 'app/api/fetchAdverts.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import styles from 'widgets/settingForm/settingTransport/libr/settingTransportForm.module.scss';
import { TypeSettingTransport } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport';
import { useAppSelector } from 'app/store/hooks';

interface Props {
    setValue: UseFormSetValue<TypeSettingTransport>;
    control: Control<TypeSettingTransport, string[]>;
    watch: UseFormWatch<TypeSettingTransport>;
}

type SelectOption = {
    value: string;
    label: string;
};

export const City = ({ control, setValue, watch }: Props) => {
    const { data } = useGetFiltersQuery('');
    const [cityValues, setCityValues] = useState<SelectOption[]>([]);
    const { t } = useTranslation();
    const region = watch('region');
    const { data: availableData } = useGetAvailableFiltersQuery(
        `?region=${region || 'north-goa'}`
    );
    const lang = useAppSelector((state) => state.setLang.lang);

    useEffect(() => {
        if (data && availableData) {
            const result = (data['city'] as SelectOption[]).filter((el) =>
                (availableData.available_params.city as string[]).includes(
                    el.value
                )
            );
            setCityValues(result as SelectOption[]);
        }
    }, [data, availableData]);

    return (
        <>
            <div className={styles.propertyCity}>
                <h3>{t('filters.property_city')}</h3>
                <UniversalSelectDropdown<TypeSettingTransport>
                    setValue={setValue}
                    control={control}
                    name="city"
                    prefix="filterForm"
                    placeholder={t('filters.property_city')}
                    closeMenuOnSelect={false}
                    isMulti={true}
                    options={
                        lang === 'ru'
                            ? cityValues
                            : cityValues.map((el) => ({
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

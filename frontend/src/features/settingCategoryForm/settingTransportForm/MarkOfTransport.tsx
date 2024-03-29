import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { TypeSettingTransport } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport.ts';
import {
    useGetAvailableFiltersQuery,
    useGetFiltersQuery,
} from 'app/api/fetchAdverts.ts';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import { useEffect, useState } from 'react';
import styles from 'widgets/settingForm/settingTransport/libr/settingTransportForm.module.scss';
import { useAppSelector } from 'app/store/hooks';

interface Props {
    setValue: UseFormSetValue<TypeSettingTransport>;
    control: Control<TypeSettingTransport, string[]>;
    watch: UseFormWatch<TypeSettingTransport>;
}

type SelectType = {
    value: string;
    label: string;
};

export const MarkOfTransport = ({ setValue, control, watch }: Props) => {
    const { data } = useGetFiltersQuery('');
    const region = watch('region');
    const city = watch('city');
    const category = watch('transport_category');
    const [markOfTransportValues, setMarkOfTransportValues] = useState<
        SelectType[]
    >([]);
    const { t } = useTranslation();
    const { data: availableData } = useGetAvailableFiltersQuery(
        `?region=${region || 'north-goa'}${city ? `&city=${city}` : ''}${
            category ? `&transport_category=${category}` : ''
        }`
    );
    const lang = useAppSelector((state) => state.setLang.lang);

    useEffect(() => {
        if (data && availableData) {
            const result = (data['transport_brand'] as SelectType[]).filter(
                (el) =>
                    (
                        availableData.available_params
                            .transport_brand as string[]
                    ).includes(el.value)
            );
            data && setMarkOfTransportValues(result as SelectType[]);
        }
    }, [data, availableData]);

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
                options={
                    lang === 'ru'
                        ? markOfTransportValues
                        : markOfTransportValues.map((el) => ({
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

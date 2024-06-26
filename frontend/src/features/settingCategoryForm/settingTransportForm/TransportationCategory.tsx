import { Control, UseFormSetValue } from 'react-hook-form';
import { TypeSettingTransport, Price } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import styles from 'widgets/settingForm/settingTransport/libr/settingTransportForm.module.scss';
import { useAppSelector } from 'app/store/hooks';
import { getDashOptions } from 'shared/utils';

interface Props {
    setValue: UseFormSetValue<TypeSettingTransport>;
    control: Control<TypeSettingTransport, string[]>;
    available_params: string[] | Price | undefined;
}

type SelectType = {
    value: string;
    label: string;
};

export const TransportationCategory = ({ setValue, control, available_params }: Props) => {
    const { data } = useGetFiltersQuery('');
    const [categoryValues, setCategoryValues] = useState<SelectType[]>([]);
    const { t } = useTranslation();
    const lang = useAppSelector((state) => state.setLang.lang);

    useEffect(() => {
        if (data && available_params) {
            const result = (data['transport_category'] as SelectType[]).filter(
                (el) => (available_params as string[]).includes(el.value)
            );
            setCategoryValues(result as SelectType[]);
        }
    }, [data, available_params]);

    const options = getDashOptions(lang, categoryValues);

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
                options={options}
                defaultValue={options.length === 1 ? options[0] : undefined}
            />
        </div>
    );
};

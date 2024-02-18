import { Control, UseFormSetValue } from 'react-hook-form';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown';
import { TypeOfCurrencyFilter } from 'widgets/settingForm/settingCurrency/libr/TypeOfCurrencyFilter.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingCurrency/libr/settingCurrencyFilter.module.scss';
import { useGetFiltersQuery } from 'app/api/fetchAdverts';
import { useEffect, useState } from 'react';

interface Props {
    setValue: UseFormSetValue<TypeOfCurrencyFilter>;
    control: Control<TypeOfCurrencyFilter, string[]>;
}

type SelectOption = {
    value: string;
    label: string;
};

export const ExchangeFor = ({ control, setValue }: Props) => {
    const { isMobile } = useMatchMedia();
    const { t } = useTranslation();
    const { data } = useGetFiltersQuery('');
    const [currencyValues, setCurrencyValues] = useState<SelectOption[]>([]);

    useEffect(() => {
        if (data) {
            const result = (data['exchange_for'] as SelectOption[]).filter(
                (el) => (el as SelectOption).value && (el as SelectOption).label
            );

            setCurrencyValues(result as SelectOption[]);
        }
    }, [data]);

    return (
        <div className={styles.exchangeFor}>
            <h3>{t('filters.exchange_for')}</h3>
            <UniversalSelectDropdown<TypeOfCurrencyFilter>
                closeMenuOnSelect={false}
                control={control}
                isMulti={false}
                name="exchange_for"
                options={currencyValues}
                placeholder={t('filters.exchange_for')}
                prefix="filterForm"
                setValue={setValue}
                isSearchable={!isMobile}
            />
        </div>
    );
};

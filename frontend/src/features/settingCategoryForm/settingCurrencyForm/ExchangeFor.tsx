import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
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
    watch: UseFormWatch<TypeOfCurrencyFilter>;
}

type SelectOption = {
    value: string;
    label: string;
};

export const ExchangeFor = ({ control, setValue, watch }: Props) => {
    const { isMobile } = useMatchMedia();
    const { t } = useTranslation();
    const { data } = useGetFiltersQuery('');
    const [currencyValues, setCurrencyValues] = useState<SelectOption[]>([]);
    const proposed = watch('proposed_currency');

    useEffect(() => {
        if (data) {
            const result = (data['exchange_for'] as SelectOption[]).filter(
                (el) => el.value !== proposed
            );

            setCurrencyValues(result as SelectOption[]);
        }
    }, [data, proposed]);

    return (
        <div className={styles.exchangeFor}>
            <h3>{t('filters.exchange_for')}</h3>
            <UniversalSelectDropdown<TypeOfCurrencyFilter>
                closeMenuOnSelect={true}
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

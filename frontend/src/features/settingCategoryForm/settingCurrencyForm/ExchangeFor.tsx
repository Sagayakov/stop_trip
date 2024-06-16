import { Control, UseFormSetValue } from 'react-hook-form';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown';
import { TypeOfCurrencyFilter } from 'widgets/settingForm/settingCurrency/libr/TypeOfCurrencyFilter.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingCurrency/libr/settingCurrencyFilter.module.scss';
import { useGetFiltersQuery } from 'app/api/fetchAdverts';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'app/store/hooks';

interface Props {
    setValue: UseFormSetValue<TypeOfCurrencyFilter>;
    control: Control<TypeOfCurrencyFilter, string[]>;
    available_params: string[] | { min: number; max: number; } | undefined;
}

type SelectOption = {
    value: string;
    label: string;
};

export const ExchangeFor = ({ control, setValue, available_params }: Props) => {
    const { isMobile } = useMatchMedia();
    const { t } = useTranslation();
    const { data } = useGetFiltersQuery('');
    const [currencyValues, setCurrencyValues] = useState<SelectOption[]>([]);
    const lang = useAppSelector((state) => state.setLang.lang);

    useEffect(() => {
        if (data && available_params) {
            const result = (data['exchange_for'] as SelectOption[]).filter((el) =>
                (available_params as string[]).includes(
                    el.value
                )
            );

            setCurrencyValues(result as SelectOption[]);
        }
    }, [data, available_params]);

    return (
        <div className={styles.exchangeFor}>
            <h3>{t('filters.exchange_for')}</h3>
            <UniversalSelectDropdown<TypeOfCurrencyFilter>
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="exchange_for"
                options={
                    lang === 'ru'
                        ? currencyValues
                        : currencyValues.map((el) => ({
                              value: el.value,
                              label: el.value,
                          }))
                }
                placeholder={t('filters.exchange_for')}
                prefix="filterForm"
                setValue={setValue}
                isSearchable={!isMobile}
            />
        </div>
    );
};

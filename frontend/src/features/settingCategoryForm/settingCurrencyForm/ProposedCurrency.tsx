import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown';
import { TypeOfCurrencyFilter } from 'widgets/settingForm/settingCurrency/libr/TypeOfCurrencyFilter.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingCurrency/libr/settingCurrencyFilter.module.scss';
import { useEffect, useState } from 'react';
import { useGetFiltersQuery } from 'app/api/fetchAdverts';
import { useAppSelector } from 'app/store/hooks';

interface Props {
    setValue: UseFormSetValue<TypeOfCurrencyFilter>;
    control: Control<TypeOfCurrencyFilter, string[]>;
    watch: UseFormWatch<TypeOfCurrencyFilter>;
}

type SelectOption = {
    value: string;
    label: string;
};

export const ProposedCurrency = ({ control, setValue, watch }: Props) => {
    const { isMobile } = useMatchMedia();
    const { t } = useTranslation();
    const { data } = useGetFiltersQuery('');
    const [currencyValues, setCurrencyValues] = useState<SelectOption[]>([]);
    const exchangeFor = watch('exchange_for');
    const lang = useAppSelector((state) => state.setLang.lang);

    useEffect(() => {
        if (data) {
            const result = (data['proposed_currency'] as SelectOption[]).filter(
                (el) => el.value !== exchangeFor
            );

            setCurrencyValues(result as SelectOption[]);
        }
    }, [data, exchangeFor]);

    return (
        <>
            <div className={styles.proposedCurrency}>
                <h3>{t('filters.proposed_currency')}</h3>
                <UniversalSelectDropdown
                    closeMenuOnSelect={true}
                    control={control}
                    isMulti={false}
                    name="proposed_currency"
                    options={
                        lang === 'ru'
                            ? currencyValues
                            : currencyValues.map((el) => ({
                                  value: el.value,
                                  label: el.value,
                              }))
                    }
                    placeholder={t('filters.proposed_currency')}
                    prefix="filterForm"
                    setValue={setValue}
                    isSearchable={!isMobile}
                />
            </div>
        </>
    );
};

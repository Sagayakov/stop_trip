import { Control, UseFormSetValue } from 'react-hook-form';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown';
import { TypeOfCurrencyFilter } from 'widgets/settingForm/settingCurrency/libr/TypeOfCurrencyFilter.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingCurrency/libr/settingCurrencyFilter.module.scss';
import { useEffect, useState } from 'react';
import { useGetFiltersQuery } from 'app/api/fetchAdverts';

interface Props {
    setValue: UseFormSetValue<TypeOfCurrencyFilter>;
    control: Control<TypeOfCurrencyFilter, string[]>;
}

type SelectOption = {
    value: string;
    label: string;
};

export const ProposedCurrency = ({ control, setValue }: Props) => {
    const { isMobile } = useMatchMedia();
    const { t } = useTranslation();
    const { data } = useGetFiltersQuery('');
    const [currencyValues, setCurrencyValues] = useState<SelectOption[]>([]);

    useEffect(() => {
        if (data) {
            const result = (data['proposed_currency'] as SelectOption[]).filter(
                (el) => (el as SelectOption).value && (el as SelectOption).label
            );

            setCurrencyValues(result as SelectOption[]);
        }
    }, [data]);

    return (
        <>
            <div className={styles.proposedCurrency}>
                <h3>{t('filters.proposed_currency')}</h3>
                <UniversalSelectDropdown
                    closeMenuOnSelect={false}
                    control={control}
                    isMulti={true}
                    name="proposed_currency"
                    options={currencyValues}
                    placeholder={t('filters.proposed_currency')}
                    prefix="filterForm"
                    setValue={setValue}
                    isSearchable={!isMobile}
                />
            </div>
        </>
    );
};

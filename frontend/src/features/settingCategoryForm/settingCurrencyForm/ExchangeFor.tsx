import { Control, UseFormSetValue } from 'react-hook-form';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import { UniversalSelectDropdown } from 'entities/universalEntites/UniversalSelectDropdown';
import { TypeOfCurrencyFilter } from 'widgets/settingForm/settingCurrency/libr/TypeOfCurrencyFilter.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingCurrency/libr/settingCurrencyFilter.module.scss'

interface Props {
    setValue: UseFormSetValue<TypeOfCurrencyFilter>;
    control: Control<TypeOfCurrencyFilter, string[]>;
}

export const ExchangeFor = ({ control, setValue }: Props) => {
    const { isMobile } = useMatchMedia();
    const { t } = useTranslation();

    const options = [
        { value: 'EUR', label: 'Евро' },
        { value: 'RUB', label: 'Рубль' },
        { value: 'INR', label: 'Рупий' },
        { value: 'USD', label: 'Доллар' },
    ];

    return (
        <div className={styles.exchangeFor}>
            <h3>{t('filters.exchange_for')}</h3>
            <UniversalSelectDropdown<TypeOfCurrencyFilter>
                closeMenuOnSelect={false}
                control={control}
                isMulti={true}
                name="exchange_for"
                options={options}
                placeholder={t('filters.exchange_for')}
                prefix="filterForm"
                setValue={setValue}
                isSearchable={!isMobile}
            />
        </div>
    );
};

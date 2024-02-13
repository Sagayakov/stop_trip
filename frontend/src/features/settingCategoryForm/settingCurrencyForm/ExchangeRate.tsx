import { UseFormRegister } from 'react-hook-form';
import { TypeOfCurrencyFilter } from 'widgets/settingForm/settingCurrency/libr/TypeOfCurrencyFilter.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingCurrency/libr/settingCurrencyFilter.module.scss';

interface Props {
    register: UseFormRegister<TypeOfCurrencyFilter>;
}

export const ExchangeRate = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.exchangeRate}>
            <h3>{t('filters.exchange_rate')}</h3>
            <div className={styles.exchangeRateInput}>
                <input
                    type="number"
                    placeholder={t('filters.exchange_rate')}
                    min={0}
                    step={0.01}
                    {...register('exchange_rate')}
                />
            </div>
        </div>
    );
};

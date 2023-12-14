import { UseFormRegister } from 'react-hook-form';
import { TypeOfCurrencyFilter } from '../../../widgets/settingForm/settingCurrency/libr/TypeOfCurrencyFilter';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<TypeOfCurrencyFilter>;
}

export const ExchangeRate = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="exchangeRate">
            <h3>{t('filters.exchange-rate')}</h3>
            <div className="exchangeRateInput">
                <input
                    type="number"
                    placeholder={t('filters.exchange-rate')}
                    min={0}
                    {...register('exchange_rate')}
                />
            </div>
        </div>
    );
};

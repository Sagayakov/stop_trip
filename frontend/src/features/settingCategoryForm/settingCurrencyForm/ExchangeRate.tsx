import { UseFormRegister } from 'react-hook-form';
import { TypeOfCurrencyFilter } from '../../../widgets/settingForm/settingCurrency/libr/TypeOfCurrencyFilter';

interface Props {
    register: UseFormRegister<TypeOfCurrencyFilter>;
}

export const ExchangeRate = ({ register }: Props) => {
    
    return (
        <div className="exchangeRate">
            <h3>Курс</h3>
            <div className="exchangeRateInput">
                <input
                    type="number"
                    placeholder="Курс"
                    min={0}
                    {...register('exchange_rate')}
                />
            </div>
        </div>
    );
};

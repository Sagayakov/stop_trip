import { UseFormRegister } from 'react-hook-form';
import { TypeOfCurrencyFilter } from 'widgets/settingForm/settingCurrency/libr/TypeOfCurrencyFilter.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingCurrency/libr/settingCurrencyFilter.module.scss';
import { useSearchParams } from 'react-router-dom';
import { RangeType } from 'app/api/types/filtersType';
import { useEffect, useState } from 'react';

interface Props {
    register: UseFormRegister<TypeOfCurrencyFilter>;
    available_params: string[] | RangeType | undefined;
}

export const ExchangeRate = ({ register, available_params }: Props) => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const searchValue = searchParams.get('exchange_rate');
    const [params, setParams] = useState<RangeType>();

    useEffect(() => {
        if (available_params) {
            const { min, max } = available_params as RangeType;
            setParams({ min, max });
        }
    }, [available_params]);

    return (
        <div className={styles.exchangeRate}>
            <h3>{t('filters.exchange_rate')}</h3>
            <div className={styles.exchangeRateInput}>
                <input
                    type="number"
                    placeholder={params ? `${params.min} - ${params.max}` : t('filters.exchange_rate')}
                    min={0}
                    step={0.01}
                    defaultValue={searchValue || ''}
                    {...register('exchange_rate')}
                />
            </div>
        </div>
    );
};

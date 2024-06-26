import { useMemo } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { TypeOfCurrencyFilter } from 'widgets/settingForm/settingCurrency/libr/TypeOfCurrencyFilter.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingCurrency/libr/settingCurrencyFilter.module.scss';
import { useSearchParams } from 'react-router-dom';
import { RangeType } from 'app/api/types/filtersType';

interface Props {
    register: UseFormRegister<TypeOfCurrencyFilter>;
    available_params: string[] | RangeType | undefined;
}

export const ExchangeRate = ({ register, available_params }: Props) => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const params = useMemo<RangeType | undefined>(
        () => {
            if (available_params) {
                const { min, max } = available_params as RangeType;
                return { min, max };
            }
        },    
        [available_params],
    );

    const min = searchParams.get('exchange_rate_min')
        ? Number(searchParams.get('exchange_rate_min'))
        : undefined;
    const max = searchParams.get('exchange_rate_max')
        ? Number(searchParams.get('exchange_rate_max'))
        : undefined;

    return (
        <div className={styles.exchangeRate}>
            <h3>{t('filters.exchange_rate')}</h3>
            <div className={styles.exchangeRateInput}>
                <input
                    type="number"
                    min="0"
                    placeholder={params?.min ? `${params?.min}` : t('filters.from')}
                    defaultValue={min}
                    {...register('exchange_rate.min')}
                />
                <input
                    type="number"
                    placeholder={params?.max ? `${params?.max}` : t('filters.up-to')}
                    defaultValue={max}
                    {...register('exchange_rate.max')}
                />
            </div>
        </div>
    );
};

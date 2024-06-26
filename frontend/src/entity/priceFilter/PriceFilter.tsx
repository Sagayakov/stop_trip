import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import styles from './priceFilter.module.scss';

interface Price {
    min: number;
    max: number;
}

interface Props<T extends FieldValues> {
    register: UseFormRegister<T>;
    available_params: string[] | Price | undefined;
}

export const PriceFilter = <T extends FieldValues>({ register, available_params }: Props<T>) => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const params = useMemo<Price | undefined>(
        () => {
            if (available_params) {
                const { min, max } = available_params as Price;
                return { min, max };
            }
        },    
        [available_params],
    );

    const min = searchParams.get('price_min')
        ? Number(searchParams.get('price_min'))
        : undefined;
    const max = searchParams.get('price_max')
        ? Number(searchParams.get('price_max'))
        : undefined;

    return (
        <div className={styles.price}>
            <h3>{t('filters.price')}</h3>
            <div className={styles.setting_price}>
                <input
                    type="number"
                    placeholder={params?.min ? `${params?.min}` : t('filters.from')}
                    min="0"
                    defaultValue={min}
                    {...register('price.min' as Path<T>)}
                />
                <input
                    type="number"
                    placeholder={params?.max ? `${params?.max}` : t('filters.up-to')}
                    defaultValue={max}
                    {...register('price.max' as Path<T>)}
                />
            </div>
        </div>
    );
};

import { useMemo } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingFood/libr/settingFoordForm.module.scss';
import { useSearchParams } from 'react-router-dom';
import { TypeForFoodForm, Price } from 'widgets/settingForm/settingFood/libr/TypeForFoodForm';

interface Props {
    register: UseFormRegister<TypeForFoodForm>;
    available_params: string[] | Price | undefined;
}

export const FoodPrice = ({ register, available_params }: Props) => {
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
                    min="0"
                    placeholder={params?.min ? `${params?.min}` : t('filters.from')}
                    defaultValue={min}
                    {...register('price.min')}
                />
                <input
                    type="number"
                    placeholder={params?.max ? `${params?.max}` : t('filters.up-to')}
                    defaultValue={max}
                    {...register('price.max')}
                />
            </div>
        </div>
    );
};

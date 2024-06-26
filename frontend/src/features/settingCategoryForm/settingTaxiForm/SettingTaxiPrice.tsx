import { useMemo } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTaxi, Price } from 'widgets/settingForm/settingTaxi/libr/TypeSettingTaxi.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingTaxi/libr/settingTaxiForm.module.scss';
import { useSearchParams } from 'react-router-dom';

interface Props {
    register: UseFormRegister<TypeSettingTaxi>;
    available_params: string[] | Price | undefined;
}

export const SettingTaxiPrice = ({ register, available_params }: Props) => {
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
        <div className={styles.taxiPrice}>
            <h3>{t('filters.price')}</h3>
            <div className={styles.setting_taxiPrice}>
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

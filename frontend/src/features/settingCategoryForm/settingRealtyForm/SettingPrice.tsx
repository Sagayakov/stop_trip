import { useMemo } from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { TypeSettingRealty, Price } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss';
import { useSearchParams } from 'react-router-dom';

interface Props {
    watch: UseFormWatch<TypeSettingRealty>;
    register: UseFormRegister<TypeSettingRealty>;
    available_params: string[] | { min: number; max: number } | Price | undefined;
}

export const SettingPrice = ({ register, watch, available_params }: Props) => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const params = useMemo<{ min: number; max: number; } | undefined>(
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

    const radio = watch('price.limit');
    const checkedStyle = {
        color: 'white',
        backgroundColor: '#1F6FDE',
    };

    return (
        <div className={styles.setting_price}>
            <h3>{t('filters.price')}</h3>
            <div className={styles.setting_price_announcement}>
                <label style={radio === '15000' ? checkedStyle : {}}>
                    <input
                        type="radio"
                        value="15000"
                        {...register('price.limit')}
                    />
                    {`${t('filters.max')} 15 000₹`}
                </label>
                <label style={radio === '30000' ? checkedStyle : {}}>
                    <input
                        type="radio"
                        value="30000"
                        {...register('price.limit')}
                    />
                    {`${t('filters.max')} 30 000₹`}
                </label>
            </div>
            <div className={styles.setting_price_inputs}>
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

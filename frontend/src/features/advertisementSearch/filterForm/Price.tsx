import { PRICE_PRESETS, formatMoney } from 'shared/const/geo.ts';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SearchFormTypes } from 'pages/advertisementSearch/AdvertisementSearch.tsx';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss';

interface Props {
    register: UseFormRegister<SearchFormTypes>;
    watch: UseFormWatch<SearchFormTypes>;
} 

export const Price = ({ watch, register }: Props) => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
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
                {PRICE_PRESETS.map((preset) => (
                    <label
                        key={preset}
                        style={radio === preset ? checkedStyle : {}}
                    >
                        <input
                            type="radio"
                            value={preset}
                            {...register('price.limit')}
                        />
                        {`${t('filters.max')} ${formatMoney(preset)}`}
                    </label>
                ))}
            </div>
            <div className={styles.setting_price_inputs}>
                <input
                    type="number"
                    min="0"
                    placeholder={t('filters.from')}
                    defaultValue={min}
                    {...register('price.min')}
                />
                <input
                    type="number"
                    placeholder={t('filters.up-to')}
                    defaultValue={max}
                    {...register('price.max')}
                />
            </div>
        </div>
    );
};
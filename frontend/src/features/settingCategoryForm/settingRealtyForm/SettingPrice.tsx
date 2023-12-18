import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    watch: UseFormWatch<TypeSettingRealty>;
    register: UseFormRegister<TypeSettingRealty>;
}

export const SettingPrice = ({ register, watch }: Props) => {
    const { t } = useTranslation();

    const radio = watch('price.limit');
    const checkedStyle = {
        color: 'white',
        backgroundColor: '#1F6FDE',
    };

    return (
        <div className="setting-price">
            <h3>{t('filters.price')}</h3>
            <div className="setting-price-announcement">
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
            <div className="setting-price-inputs">
                <input
                    id="price-input-min"
                    type="number"
                    min="0"
                    placeholder={t('filters.from')}
                    {...register('price.min')}
                />
                <input
                    id="price-input-max"
                    type="number"
                    placeholder={t('filters.up-to')}
                    {...register('price.max')}
                />
            </div>
        </div>
    );
};

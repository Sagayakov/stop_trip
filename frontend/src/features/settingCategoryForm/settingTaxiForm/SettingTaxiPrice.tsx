import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTaxi } from '../../../widgets/settingForm/settingTaxi/libr/TypeSettingTaxi';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<TypeSettingTaxi>;
}

export const SettingTaxiPrice = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="taxiPrice">
            <h3>{t('filters.price')}</h3>
            <div className="setting-taxiPrice">
                <input
                    // id="setting-price-input-min"
                    type="number"
                    min="0"
                    placeholder={t('filters.from')}
                    {...register('price.min')}
                />
                <input
                    // id="setting-price-input-max"
                    type="number"
                    placeholder={t('filters.up-to')}
                    {...register('price.max')}
                />
            </div>
        </div>
    );
};

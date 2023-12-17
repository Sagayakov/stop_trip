import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}
export const RealtyCommission = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="realtyComission">
            <h3>{t('filters.property_commission')}</h3>
            <div className="select-realtyComission">
                <input
                    type="number"
                    min="0"
                    placeholder={t('filters.from')}
                    {...register('property_commission.min')}
                />
                <input
                    id="setting-price-input-max"
                    min="0"
                    type="number"
                    placeholder={t('filters.up-to')}
                    {...register('property_commission.max')}
                />
            </div>
        </div>
    );
};

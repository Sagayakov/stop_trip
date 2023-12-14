import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from '../../../widgets/settingForm/settingRealty/libr/TypeSettingRealty';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const BathroomQuantity = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="bathroom-quantity">
            <h3>{t('filters.property_bathroom_count')}</h3>
            <div className="setting-rooms-quantity">
                <input
                    type="number"
                    placeholder={t('filters.quantity')}
                    min={0}
                    {...register('property_bathroom_count')}
                />
            </div>
        </div>
    );
};

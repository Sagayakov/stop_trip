import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const RoomsQuantity = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="rooms-quantity">
            <h3>{t('filters.property_rooms_count')}</h3>
            <div className="setting-rooms-quantity">
                <input
                    id="price-input-min"
                    type="number"
                    min="0"
                    placeholder={t('filters.from')}
                    {...register('property_rooms_count.min')}
                />
                <input
                    id="price-input-max"
                    type="number"
                    placeholder={t('filters.up-to')}
                    {...register('property_rooms_count.max')}
                />
            </div>
        </div>
    );
};

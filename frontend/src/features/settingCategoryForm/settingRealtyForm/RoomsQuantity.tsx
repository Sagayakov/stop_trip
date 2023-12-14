import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from '../../../widgets/settingForm/settingRealty/libr/TypeSettingRealty';
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
                <label className="form-checkbox">
                    <input
                        type="checkbox"
                        id="setting-rooms-quantity-1"
                        value="1"
                        {...register('property_rooms_count')}
                    />
                    <span>1</span>
                </label>
                <label className="form-checkbox">
                    <input
                        type="checkbox"
                        id="setting-rooms-quantity-2"
                        value="2"
                        {...register('property_rooms_count')}
                    />
                    <span>2</span>
                </label>
                <label className="form-checkbox">
                    <input
                        type="checkbox"
                        id="setting-rooms-quantity-3"
                        value="3"
                        {...register('property_rooms_count')}
                    />
                    <span>3</span>
                </label>
                <label className="form-checkbox">
                    <input
                        type="checkbox"
                        id="setting-rooms-quantity-4"
                        value="4"
                        {...register('property_rooms_count')}
                    />
                    <span>4</span>
                </label>
            </div>
        </div>
    );
};

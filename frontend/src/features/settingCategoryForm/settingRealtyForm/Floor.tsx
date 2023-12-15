import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from '../../../widgets/settingForm/settingRealty/libr/TypeSettingRealty';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const Floor = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="floor">
            <h3>{t('filters.property_floor')}</h3>
            <div className="setting-floor">
                <input
                    type="number"
                    placeholder={t('filters.property_floor')}
                    min={0}
                    {...register('property_floor')}
                />
            </div>
        </div>
    );
};

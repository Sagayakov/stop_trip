import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from '../../../widgets/settingForm/settingRealty/libr/TypeSettingRealty';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const SleepingPlaces = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="sleepingPlaces">
            <h3>{t('filters.property_sleeping_places')}</h3>
            <div className="setting-sleepingPlaces">
                <input
                    type="number"
                    placeholder={t('filters.quantity')}
                    min={0}
                    {...register('property_sleeping_places')}
                />
            </div>
        </div>
    );
};

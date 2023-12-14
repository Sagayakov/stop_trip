import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from '../../../widgets/settingForm/settingRealty/libr/TypeSettingRealty';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const LivingSpace = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="living-space">
            <h3>{t('filters.property_living_area')}</h3>
            <div className="living-space-inputs">
                <input
                    id="living-space-input-min"
                    type="number"
                    placeholder={t('filters.from')}
                    {...register('property_living_area.min')}
                />
                <input
                    id="living-space-input-max"
                    type="number"
                    placeholder={t('filters.up-to')}
                    {...register('property_living_area.max')}
                />
            </div>
        </div>
    );
};

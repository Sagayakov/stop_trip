import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const TotalArea = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="total-area">
            <h3>{t('filters.total-area')}</h3>
            <div className="total-area-inputs">
                <input
                    id="total-area-input-min"
                    type="number"
                    placeholder={t('filters.from')}
                    {...register('property_area.min')}
                />
                <input
                    id="total-area-input-max"
                    type="number"
                    placeholder={t('filters.up-to')}
                    {...register('property_area.max')}
                />
            </div>
        </div>
    );
};

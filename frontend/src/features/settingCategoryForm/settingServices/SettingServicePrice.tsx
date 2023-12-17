import { UseFormRegister } from 'react-hook-form';
import { TypeOfServicesForm } from 'widgets/settingForm/settingServices/libr/TypeOfServicesForm.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<TypeOfServicesForm>;
}

export const SettingServicePrice = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="servicePrice">
            <h3>{t('filters.price')}</h3>
            <div className="setting-servicePrice">
                <input
                    type="number"
                    min="0"
                    placeholder={t('filters.from')}
                    {...register('price.min')}
                />
                <input
                    type="number"
                    placeholder={t('filters.up-to')}
                    {...register('price.max')}
                />
            </div>
        </div>
    );
};

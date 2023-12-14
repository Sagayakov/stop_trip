import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
}

export const YearOfProduction = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="yearOfProduction">
            <h3>{t('filters.transport_year_of_production')}</h3>
            <div className="setting-yearOfProduction">
                <input
                    type="number"
                    {...register('transport_year_of_production.min')}
                    placeholder={t('filters.from')}
                />
                <input
                    type="number"
                    {...register('transport_year_of_production.max')}
                    placeholder={t('filters.up-to')}
                />
            </div>
        </div>
    );
};

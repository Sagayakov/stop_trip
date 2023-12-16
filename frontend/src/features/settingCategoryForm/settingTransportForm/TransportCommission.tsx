import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTransport } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
}
export const TransportCommission = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="transportComission">
            <h3>{t('filters.transport_commission')}</h3>
            <div className="setting-transportComission">
                <input
                    type="text"
                    pattern="[0-9]*[.,]?[0-9]+"
                    autoComplete="off"
                    {...register('transport_commission.min')}
                    min={1}
                    placeholder={t('filters.from')}
                />
                <input
                    type="text"
                    pattern="[0-9]*[.,]?[0-9]+"
                    autoComplete="off"
                    {...register('transport_commission.max')}
                    min={1}
                    placeholder={t('filters.up-to')}
                />
            </div>
        </div>
    );
};

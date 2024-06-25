import { useMemo } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTransport, Price } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingTransport/libr/settingTransportForm.module.scss';
import { useSearchParams } from 'react-router-dom';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
    available_params: string[] | Price | undefined;
}

export const TransportCommission = ({ register, available_params }: Props) => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const params = useMemo<{ min: number; max: number; } | undefined>(
        () => {
            if (available_params) {
                const { min, max } = available_params as Price;
                return { min, max };
            }
        },    
        [available_params],
    );

    const min = searchParams.get('transport_commission_min')
        ? Number(searchParams.get('transport_commission_min'))
        : undefined;
    const max = searchParams.get('transport_commission_max')
        ? Number(searchParams.get('transport_commission_max'))
        : undefined;

    return (
        <div className={styles.transportComission}>
            <h3>{t('filters.transport_commission')}</h3>
            <div className={styles.setting_transportComission}>
                <input
                    type="text"
                    pattern="[0-9]*[.,]?[0-9]+"
                    autoComplete="off"
                    {...register('transport_commission.min')}
                    min={1}
                    placeholder={params?.min ? `${params?.min}` : t('filters.from')}
                    defaultValue={min}
                />
                <input
                    type="text"
                    pattern="[0-9]*[.,]?[0-9]+"
                    autoComplete="off"
                    {...register('transport_commission.max')}
                    min={1}
                    placeholder={params?.max ? `${params?.max}` : t('filters.up-to')}
                    defaultValue={max}
                />
            </div>
        </div>
    );
};

import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTransport } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingTransport/libr/settingTransportForm.module.scss';
import { useSearchParams } from 'react-router-dom';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
}

export const EngineCapacity = ({ register }: Props) => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const min = searchParams.get('transport_engine_volume_min')
        ? Number(searchParams.get('transport_engine_volume_min'))
        : undefined;
    const max = searchParams.get('transport_engine_volume_max')
        ? Number(searchParams.get('transport_engine_volume_max'))
        : undefined;

    return (
        <div className={styles.engineCapacity}>
            <h3>{t('filters.transport_engine_volume')}</h3>
            <div className={styles.setting_engineCapacity}>
                <input
                    type="text"
                    pattern="[0-9]*[.,]?[0-9]+"
                    autoComplete="off"
                    {...register('transport_engine_volume.min')}
                    min="0"
                    placeholder={t('filters.from')}
                    defaultValue={min}
                />
                <input
                    type="text"
                    pattern="[0-9]*[.,]?[0-9]+"
                    autoComplete="off"
                    {...register('transport_engine_volume.max')}
                    min="0.1"
                    placeholder={t('filters.up-to')}
                    defaultValue={max}
                />
            </div>
        </div>
    );
};

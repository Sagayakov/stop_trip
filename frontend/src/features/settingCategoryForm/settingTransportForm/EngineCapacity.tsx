import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTransport } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingTransport/libr/settingTransportForm.module.scss'

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
}

export const EngineCapacity = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.engineСapacity}>
            <h3>{t('filters.transport_engine_volume')}</h3>
            <div className={styles.setting_engineCapacity}>
                <input
                    type="text"
                    pattern="[0-9]*[.,]?[0-9]+"
                    autoComplete="off"
                    {...register('transport_engine_volume.min')}
                    min="0"
                    placeholder={t('filters.from')}
                />
                <input
                    type="text"
                    pattern="[0-9]*[.,]?[0-9]+"
                    autoComplete="off"
                    {...register('transport_engine_volume.max')}
                    min="0.5"
                    placeholder={t('filters.up-to')}
                />
            </div>
        </div>
    );
};

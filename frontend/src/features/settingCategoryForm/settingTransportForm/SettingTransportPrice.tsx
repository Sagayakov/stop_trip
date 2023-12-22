import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTransport } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingTransport/libr/settingTransportForm.module.scss'

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
}

export const SettingTransportPrice = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.transportPrice}>
            <h3>{t('filters.price')}</h3>
            <div className={styles.setting_transportPrice}>
                <input
                    type="number"
                    placeholder={t('filters.from')}
                    min="0"
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

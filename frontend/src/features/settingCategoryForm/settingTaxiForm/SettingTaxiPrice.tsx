import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTaxi } from 'widgets/settingForm/settingTaxi/libr/TypeSettingTaxi.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingTaxi/libr/settingTaxiForm.module.scss'

interface Props {
    register: UseFormRegister<TypeSettingTaxi>;
}

export const SettingTaxiPrice = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.taxiPrice}>
            <h3>{t('filters.price')}</h3>
            <div className={styles.setting_taxiPrice}>
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

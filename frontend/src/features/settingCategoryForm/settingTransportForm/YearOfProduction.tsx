import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTransport } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingTransport/libr/settingTransportForm.module.scss'

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
}

export const YearOfProduction = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.yearOfProduction}>
            <h3>{t('filters.transport_year_of_production')}</h3>
            <div className={styles.setting_yearOfProduction}>
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

import { UseFormRegister } from 'react-hook-form';
import { TypeOfServicesForm } from 'widgets/settingForm/settingServices/libr/TypeOfServicesForm.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingServices/libr/settingServicesForm.module.scss';
import { useSearchParams } from 'react-router-dom';

interface Props {
    register: UseFormRegister<TypeOfServicesForm>;
}

export const SettingServicePrice = ({ register }: Props) => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const min = searchParams.get('price_min')
        ? Number(searchParams.get('price_min'))
        : undefined;
    const max = searchParams.get('price_max')
        ? Number(searchParams.get('price_max'))
        : undefined;

    return (
        <div className={styles.servicePrice}>
            <h3>{t('filters.price')}</h3>
            <div className={styles.setting_servicePrice}>
                <input
                    type="number"
                    min="0"
                    placeholder={t('filters.from')}
                    defaultValue={min}
                    {...register('price.min')}
                />
                <input
                    type="number"
                    placeholder={t('filters.up-to')}
                    defaultValue={max}
                    {...register('price.max')}
                />
            </div>
        </div>
    );
};

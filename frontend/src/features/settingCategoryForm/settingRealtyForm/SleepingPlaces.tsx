import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss'

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const SleepingPlaces = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.sleepingPlaces}>
            <h3>{t('filters.property_sleeping_places')}</h3>
            <div className={styles.setting_sleepingPlaces}>
                <input
                    type="number"
                    min="0"
                    placeholder={t('filters.from')}
                    {...register('property_bathroom_count.min')}
                />
                <input
                    type="number"
                    placeholder={t('filters.up-to')}
                    {...register('property_bathroom_count.max')}
                />
            </div>
        </div>
    );
};

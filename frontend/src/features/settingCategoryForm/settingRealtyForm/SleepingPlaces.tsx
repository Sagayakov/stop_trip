import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss';
import { useSearchParams } from 'react-router-dom';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const SleepingPlaces = ({ register }: Props) => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const min = searchParams.get('property_sleeping_places_min')
        ? Number(searchParams.get('property_sleeping_places_min'))
        : undefined;
    const max = searchParams.get('property_sleeping_places_max')
        ? Number(searchParams.get('property_sleeping_places_max'))
        : undefined;

    return (
        <div className={styles.sleepingPlaces}>
            <h3>{t('filters.property_sleeping_places')}</h3>
            <div className={styles.setting_sleepingPlaces}>
                <input
                    type="number"
                    min="0"
                    placeholder={t('filters.from')}
                    defaultValue={min}
                    {...register('property_bathroom_count.min')}
                />
                <input
                    type="number"
                    placeholder={t('filters.up-to')}
                    defaultValue={max}
                    {...register('property_bathroom_count.max')}
                />
            </div>
        </div>
    );
};

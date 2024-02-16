import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss';
import { useSearchParams } from 'react-router-dom';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const BathroomQuantity = ({ register }: Props) => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const min = searchParams.get('property_bathroom_count_min')
        ? Number(searchParams.get('property_bathroom_count_min'))
        : undefined;
    const max = searchParams.get('property_bathroom_count_max')
        ? Number(searchParams.get('property_bathroom_count_max'))
        : undefined;

    return (
        <div className={styles.bathroom_quantity}>
            <h3>{t('filters.property_bathroom_count')}</h3>
            <div className={styles.setting_rooms_quantity}>
                <input
                    type="number"
                    min="0"
                    placeholder={t('filters.from')}
                    defaultValue={min}
                    {...register('property_sleeping_places.min')}
                />
                <input
                    type="number"
                    placeholder={t('filters.up-to')}
                    defaultValue={max}
                    {...register('property_sleeping_places.max')}
                />
            </div>
        </div>
    );
};

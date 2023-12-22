import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss'

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const RoomsQuantity = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.rooms_quantity}>
            <h3>{t('filters.property_rooms_count')}</h3>
            <div className={styles.setting_rooms_quantity}>
                <input
                    type="number"
                    min="0"
                    placeholder={t('filters.from')}
                    {...register('property_rooms_count.min')}
                />
                <input
                    type="number"
                    placeholder={t('filters.up-to')}
                    {...register('property_rooms_count.max')}
                />
            </div>
        </div>
    );
};

import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss'

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const Floor = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.floor}>
            <h3>{t('filters.property_floor')}</h3>
            <div className={styles.setting_floor}>
                <input
                    type="number"
                    placeholder={t('filters.property_floor')}
                    min={0}
                    {...register('property_floor')}
                />
            </div>
        </div>
    );
};

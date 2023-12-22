import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss'

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const HasFurniture = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.hasFurniture}>
            <h3>{t('filters.property_has_furniture')}</h3>
            <div className={styles.setting_hasFurniture}>
                <label className={`${styles.form_checkbox} form_checkbox`}>
                    <input
                        type="checkbox"
                        {...register('property_has_furniture')}
                    />
                    <span>{t('filters.with-furniture')}</span>
                </label>
            </div>
        </div>
    );
};

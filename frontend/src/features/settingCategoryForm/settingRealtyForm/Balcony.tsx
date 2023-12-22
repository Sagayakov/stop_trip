import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss'

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const Balcony = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.balcony}>
            <h3>{t('filters.property_balcony')}</h3>
            <div className={styles.balcony_setting}>
                <label className={`form_checkbox ${styles.form_checkbox}`}>
                    <input
                        type="checkbox"
                        value="yes"
                        {...register('property_balcony')}
                    />
                    <span>{t('filters.yes')}</span>
                </label>
                <label className={`${styles.form_checkbox} form_checkbox`}>
                    <input
                        type="checkbox"
                        value="no"
                        {...register('property_balcony')}
                    />
                    <span>{t('filters.no')}</span>
                </label>
                <label className={`${styles.form_checkbox} form_checkbox`}>
                    <input
                        type="checkbox"
                        value="loggia"
                        {...register('property_balcony')}
                    />
                    <span>{t('filters.loggia')}</span>
                </label>
            </div>
        </div>
    );
};

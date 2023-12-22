import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss'

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const Bathroom = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.bathroom}>
            <h3>{t('filters.property_bathroom_type')}</h3>
            <div className={styles.bathroom_setting}>
                <label className={`${styles.form_checkbox} form_checkbox`}>
                    <input
                        type="checkbox"
                        value="combined"
                        {...register('property_bathroom_type')}
                    />
                    <span>{t('filters.combined')}</span>
                </label>
                <label className={`${styles.form_checkbox} form_checkbox`}>
                    <input
                        type="checkbox"
                        value="separate"
                        {...register('property_bathroom_type')}
                    />
                    <span>{t('filters.separate')}</span>
                </label>
            </div>
        </div>
    );
};

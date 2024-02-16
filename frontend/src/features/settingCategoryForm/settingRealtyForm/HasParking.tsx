import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss';
import { useSearchParams } from 'react-router-dom';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const HasParking = ({ register }: Props) => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const parkingParam = searchParams.get('property_has_parking');

    return (
        <div className={styles.hasParking}>
            <h3>{t('filters.property_has_parking')}</h3>
            <div className={styles.setting_hasParking}>
                <label className={`${styles.form_checkbox} form_checkbox`}>
                    <input
                        type="checkbox"
                        defaultChecked={!!parkingParam}
                        {...register('property_has_parking')}
                    />
                    <span>{t('filters.with-parking')}</span>
                </label>
            </div>
        </div>
    );
};

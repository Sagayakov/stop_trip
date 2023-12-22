import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss'

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const TotalArea = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.total_area}>
            <h3>{t('filters.property_area')}</h3>
            <div className={styles.total_area_inputs}>
                <input
                    type="number"
                    placeholder={t('filters.from')}
                    {...register('property_area.min')}
                />
                <input
                    type="number"
                    placeholder={t('filters.up-to')}
                    {...register('property_area.max')}
                />
            </div>
        </div>
    );
};

import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss';
import { useSearchParams } from 'react-router-dom';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const TotalArea = ({ register }: Props) => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const min = searchParams.get('property_area_min')
        ? Number(searchParams.get('property_area_min'))
        : undefined;
    const max = searchParams.get('property_area_max')
        ? Number(searchParams.get('property_area_max'))
        : undefined;

    return (
        <div className={styles.total_area}>
            <h3>{t('filters.property_area')}</h3>
            <div className={styles.total_area_inputs}>
                <input
                    type="number"
                    placeholder={t('filters.from')}
                    defaultValue={min}
                    {...register('property_area.min')}
                />
                <input
                    type="number"
                    placeholder={t('filters.up-to')}
                    defaultValue={max}
                    {...register('property_area.max')}
                />
            </div>
        </div>
    );
};

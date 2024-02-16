import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss';
import { useSearchParams } from 'react-router-dom';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const LivingSpace = ({ register }: Props) => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const min = searchParams.get('property_living_area_min')
        ? Number(searchParams.get('property_living_area_min'))
        : undefined;
    const max = searchParams.get('property_living_area_max')
        ? Number(searchParams.get('property_living_area_max'))
        : undefined;

    return (
        <div className={styles.living_space}>
            <h3>{t('filters.property_living_area')}</h3>
            <div className={styles.living_space_inputs}>
                <input
                    type="number"
                    placeholder={t('filters.from')}
                    defaultValue={min}
                    {...register('property_living_area.min')}
                />
                <input
                    type="number"
                    placeholder={t('filters.up-to')}
                    defaultValue={max}
                    {...register('property_living_area.max')}
                />
            </div>
        </div>
    );
};

import { useMemo } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty, Price } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss';
import { useSearchParams } from 'react-router-dom';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
    available_params: string[] | { min: number; max: number } | Price | undefined;
}

export const LivingSpace = ({ register, available_params }: Props) => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const params = useMemo<{ min: number; max: number; } | undefined>(
        () => {
            if (available_params) {
                const { min, max } = available_params as Price;
                return { min, max };
            }
        },    
        [available_params],
    );

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
                    placeholder={params?.min ? `${params?.min}` : t('filters.from')}
                    defaultValue={min}
                    {...register('property_living_area.min')}
                />
                <input
                    type="number"
                    placeholder={params?.max ? `${params?.max}` : t('filters.up-to')}
                    defaultValue={max}
                    {...register('property_living_area.max')}
                />
            </div>
        </div>
    );
};

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

export const RoomsQuantity = ({ register, available_params }: Props) => {
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

    const min = searchParams.get('property_rooms_count_min')
        ? Number(searchParams.get('property_rooms_count_min'))
        : undefined;
    const max = searchParams.get('property_rooms_count_max')
        ? Number(searchParams.get('property_rooms_count_max'))
        : undefined;

    return (
        <div className={styles.rooms_quantity}>
            <h3>{t('filters.property_rooms_count')}</h3>
            <div className={styles.setting_rooms_quantity}>
                <input
                    type="number"
                    min="0"
                    placeholder={params?.min ? `${params?.min}` : t('filters.from')}
                    defaultValue={min}
                    {...register('property_rooms_count.min')}
                />
                <input
                    type="number"
                    placeholder={params?.max ? `${params?.max}` : t('filters.up-to')}
                    defaultValue={max}
                    {...register('property_rooms_count.max')}
                />
            </div>
        </div>
    );
};

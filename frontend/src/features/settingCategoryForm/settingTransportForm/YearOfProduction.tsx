import { useMemo } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTransport, Price } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingTransport/libr/settingTransportForm.module.scss';
import { useSearchParams } from 'react-router-dom';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
    available_params: string[] | Price | undefined;
}

export const YearOfProduction = ({ register, available_params }: Props) => {
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

    const min = searchParams.get('transport_year_of_production_min')
        ? Number(searchParams.get('transport_year_of_production_min'))
        : undefined;
    const max = searchParams.get('transport_year_of_production_max')
        ? Number(searchParams.get('transport_year_of_production_max'))
        : undefined;

    return (
        <div className={styles.yearOfProduction}>
            <h3>{t('filters.transport_year_of_production')}</h3>
            <div className={styles.setting_yearOfProduction}>
                <input
                    type="number"
                    {...register('transport_year_of_production.min')}
                    placeholder={params?.min ? `${params?.min}` : t('filters.from')}
                    defaultValue={min}
                />
                <input
                    type="number"
                    {...register('transport_year_of_production.max')}
                    placeholder={params?.max ? `${params?.max}` : t('filters.up-to')}
                    defaultValue={max}
                />
            </div>
        </div>
    );
};

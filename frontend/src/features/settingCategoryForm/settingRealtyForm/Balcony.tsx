import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
//import { useGetFiltersQuery } from 'app/api/fetchAdverts';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

type SelectType = {
    value: string;
    label: string;
};

export const Balcony = ({ register }: Props) => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const balconyParams = searchParams.get('property_balcony');
    //const { data } = useGetFiltersQuery('');
    const [balconyValues] = useState<SelectType[]>([
        { value: 'yes', label: 'Есть' },
        { value: 'no', label: 'Нет' },
        { value: 'loggia', label: 'Лоджия' },
    ]);

    /* useEffect(() => {
        if (data) {
            const result = (data['property_balcony'] as SelectType[]).filter(
                (el) => (el as SelectType).value && (el as SelectType).label
            );
            setBalconyValues(result as SelectType[]);
        }
    }, [data]); */

    return (
        <div className={styles.balcony}>
            <h3>{t('filters.property_balcony')}</h3>
            <div className={styles.balcony_setting}>
                {balconyValues.map((el) => (
                    <label
                        className={`form_checkbox ${styles.form_checkbox}`}
                        key={el.value}
                    >
                        <input
                            type="checkbox"
                            value={el.value}
                            defaultChecked={balconyParams?.includes(el.value)}
                            {...register('property_balcony')}
                        />
                        <span>{t(`filters.${el.value}`)}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

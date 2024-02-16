import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss';
import { useGetFiltersQuery } from 'app/api/fetchAdverts';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

type SelectType = {
    value: string;
    label: string;
};

export const Bathroom = ({ register }: Props) => {
    const { t } = useTranslation();
    const { data } = useGetFiltersQuery('');
    const [bathroomValues, setBathroomValues] = useState<SelectType[]>([]);
    const [searchParams] = useSearchParams();
    const bathroomParams = searchParams.get('property_bathroom_type');

    useEffect(() => {
        if (data) {
            const result = (
                data['property_bathroom_type'] as SelectType[]
            ).filter(
                (el) => (el as SelectType).value && (el as SelectType).label
            );
            setBathroomValues(result as SelectType[]);
        }
    }, [data]);

    return (
        <div className={styles.bathroom}>
            <h3>{t('filters.property_bathroom_type')}</h3>
            <div className={styles.bathroom_setting}>
                {bathroomValues.map((el) => (
                    <label
                        className={`${styles.form_checkbox} form_checkbox`}
                        key={el.value}
                    >
                        <input
                            type="checkbox"
                            value={el.value}
                            defaultChecked={bathroomParams?.includes(el.value)}
                            {...register('property_bathroom_type')}
                        />
                        <span>{t(`filters.${el.value}`)}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

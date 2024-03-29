import { Control, UseFormSetValue } from 'react-hook-form';
import { TypeSettingTaxi } from 'widgets/settingForm/settingTaxi/libr/TypeSettingTaxi.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingTaxi/libr/settingTaxiForm.module.scss';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import { useAppSelector } from 'app/store/hooks';

interface Props {
    setValue: UseFormSetValue<TypeSettingTaxi>;
    control: Control<TypeSettingTaxi, string[]>;
}

type SelectType = {
    value: string;
    label: string;
};

export const TypeOfTaxi = ({ control, setValue }: Props) => {
    const { data } = useGetFiltersQuery('');
    const [typeValues, setTypeValues] = useState<SelectType[]>([]);
    const { t } = useTranslation();
    const lang = useAppSelector((state) => state.setLang.lang);

    useEffect(() => {
        if (data) {
            const result = (data['taxi_type'] as SelectType[]).filter(
                (el) => (el as SelectType).value && (el as SelectType).label
            );
            data && setTypeValues(result as SelectType[]);
        }
    }, [data]);

    return (
        <div className={styles.typeOfTaxi}>
            <h3>{t('filters.taxi_type')}</h3>
            <UniversalSelectDropdown
                setValue={setValue}
                control={control}
                name="taxi_type"
                prefix="filterForm"
                placeholder={t('filters.taxi_type')}
                closeMenuOnSelect={false}
                isMulti={true}
                options={
                    lang === 'ru'
                        ? typeValues
                        : typeValues.map((el) => ({
                              value: el.value,
                              label: `${el.value[0].toUpperCase()}${el.value.slice(
                                  1
                              )}`,
                          }))
                }
            />
        </div>
    );
};

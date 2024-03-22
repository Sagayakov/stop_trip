import { Control, UseFormSetValue } from 'react-hook-form';
import { TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
//import { valuesOfPropertyForm } from 'widgets/settingForm/settingRealty/libr/valuesOfPropertyForm.ts';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss';
//import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGetFiltersQuery } from 'app/api/fetchAdverts';
import { useAppSelector } from 'app/store/hooks';

interface Props {
    setValue: UseFormSetValue<TypeSettingRealty>;
    control: Control<TypeSettingRealty, string[]>;
}

type SelectType = {
    value: string;
    label: string;
};

export const Prepayment = ({ control, setValue }: Props) => {
    const { t } = useTranslation();
    const { data } = useGetFiltersQuery('');
    const [prepaymentValues, setPrepaymentValues] = useState<SelectType[]>([]);
    const lang = useAppSelector((state) => state.setLang.lang);
    //const [searchParams] = useSearchParams();
    /* const prepaymentParams = searchParams
        .get('property_prepayment')
        ?.split(',')
        .map((el) => ({
            value: el,
            label: (data?.property_prepayment as SelectType[]).find(
                (item) => item.value === el
            )?.label,
        })); */

    useEffect(() => {
        if (data) {
            const result = (data['property_prepayment'] as SelectType[]).filter(
                (el) => (el as SelectType).value && (el as SelectType).label
            );
            setPrepaymentValues(result as SelectType[]);
        }
    }, [data]);

    return (
        <>
            <div className={styles.prepayment}>
                <h3>{t('filters.property_prepayment')}</h3>
                <UniversalSelectDropdown<TypeSettingRealty>
                    setValue={setValue}
                    control={control}
                    name="property_prepayment"
                    prefix="filterForm"
                    placeholder={t('filters.property_prepayment')}
                    closeMenuOnSelect={false}
                    isMulti={true}
                    options={
                        lang === 'ru'
                            ? prepaymentValues
                            : prepaymentValues.map((el) => ({
                                  value: el.value,
                                  label: `${el.value[0].toUpperCase()}${el.value.slice(
                                      1
                                  )}`,
                              }))
                    }
                />
            </div>
        </>
    );
};
